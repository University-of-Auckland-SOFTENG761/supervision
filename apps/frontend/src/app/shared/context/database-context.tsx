import { useAuth0 } from '@auth0/auth0-react';
import {
  runPatientReplication,
  getSuperVisionDatabase,
  runConsultReplication,
  patientSchemaTyped,
  PatientDocType,
  consultSchemaTyped,
  ConsultDocType,
} from 'database';
import {
  buildFormValues,
  ConsultDocument,
  PatientDocument,
} from 'database/rxdb-utils';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { RxDatabase } from 'rxdb';
import { RxReplicationError } from 'rxdb/dist/types/plugins/replication';
import { RxGraphQLReplicationState } from 'rxdb/dist/types/plugins/replication-graphql';
import { v4 as uuidv4 } from 'uuid';
import { useNetwork } from '../hooks';

interface IDataBaseContext {
  patients: PatientDocument[];
  newPatient: () => string;
  updatePatient: (patient: PatientDocument | PatientDocType) => void;
  consults: ConsultDocument[];
  newConsult: (patientId: string) => string | undefined;
  updateConsult: (consult: ConsultDocument | ConsultDocType) => void;
}

const DatabaseContext = createContext<Partial<IDataBaseContext>>({});

type DatabaseProviderProps = {
  children: React.ReactNode;
};

export const DatabaseProvider = ({ children }: DatabaseProviderProps) => {
  const [superVisionDb, setSuperVisionDb] = useState<RxDatabase | null>(null);

  const [patientsReplicationState, setPatientsReplicationState] =
    useState<RxGraphQLReplicationState<PatientDocument> | null>(null);
  const [patients, setPatients] = useState<PatientDocument[]>([]);

  const [consultsReplicationState, setConsultsReplicationState] =
    useState<RxGraphQLReplicationState<ConsultDocument> | null>(null);
  const [consults, setConsults] = useState<ConsultDocument[]>([]);

  const { isAuthenticated, user } = useAuth0();
  const { online } = useNetwork();
  const userEmail = sessionStorage.getItem('userEmail');

  const restartReplication = async () => {
    await patientsReplicationState?.cancel();
    await consultsReplicationState?.cancel();

    if (superVisionDb) {
      const newPatientsReplicationState = await runPatientReplication(
        superVisionDb
      );
      const newConsultsReplicationState = await runConsultReplication(
        superVisionDb
      );
      setPatientsReplicationState(newPatientsReplicationState);
      setConsultsReplicationState(newConsultsReplicationState);
    }
  };

  const handleReplicationError = async (
    err: RxReplicationError<PatientDocument | ConsultDocument>
  ) => {
    const innerErrorsExist = err.innerErrors?.length > 0;
    const isAuthError =
      innerErrorsExist &&
      err.innerErrors?.some(
        (innerError: { extensions?: { code: string } }) =>
          innerError.extensions?.code === 'UNAUTHENTICATED'
      );

    if (isAuthError && isAuthenticated) {
      restartReplication();
    }

    // Display unhandled errors
    console.error(err);
    err.innerErrors?.length > 0 &&
      err.innerErrors.forEach((e: Error) => console.error(e));
  };

  useEffect(() => {
    if (patientsReplicationState) {
      patientsReplicationState.error$.subscribe(handleReplicationError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientsReplicationState]);

  useEffect(() => {
    if (consultsReplicationState) {
      consultsReplicationState.error$.subscribe(handleReplicationError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [consultsReplicationState]);

  useEffect(() => {
    const replicationStateMissing =
      !patientsReplicationState || !consultsReplicationState;
    if (isAuthenticated && replicationStateMissing) restartReplication();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, patientsReplicationState, consultsReplicationState]);

  const newPatient = useCallback(() => {
    const np = {
      id: uuidv4(),
    };
    superVisionDb?.['patients'].insert(np);
    return np.id;
  }, [superVisionDb]);

  const newConsult = useCallback(
    (patientId: string) => {
      if (!user || (!online && !userEmail) || !patients) return;
      const patient = patients.find((p) => p.id === patientId);

      const consultId = uuidv4();
      const nc = {
        id: consultId,
        userEmail: online ? user.email : userEmail,
        patientId,
        dateConsentGiven: new Date(Date.now()).toISOString(),
        spectacle: {
          id: uuidv4(),
          consultId: consultId,
          patientId: patientId,
          deliverySchool: patient?.school,
        },
      };
      superVisionDb?.['consults'].insert(nc);
      return nc.id;
    },
    [online, superVisionDb, user, userEmail, patients]
  );

  const patientDocumentsAreEqual = useCallback(
    (a: PatientDocument, b: PatientDocument) => {
      const aJSON = JSON.stringify(
        buildFormValues(patientSchemaTyped, a as PatientDocType)
      );
      const bJSON = JSON.stringify(
        buildFormValues(patientSchemaTyped, b as PatientDocType)
      );
      return aJSON === bJSON;
    },
    []
  );

  const consultDocumentsAreEqual = useCallback(
    (a: ConsultDocument, b: ConsultDocument) => {
      const aJSON = JSON.stringify(
        buildFormValues(consultSchemaTyped, a as ConsultDocType)
      );
      const bJSON = JSON.stringify(
        buildFormValues(consultSchemaTyped, b as ConsultDocType)
      );
      return aJSON === bJSON;
    },
    []
  );

  const updatePatient = useCallback(
    (patient: PatientDocument | PatientDocType) => {
      const oldPatient = patients.find((p) => p.id === patient.id);
      if (
        oldPatient &&
        patientDocumentsAreEqual(oldPatient, patient as PatientDocument)
      ) {
        return;
      }
      superVisionDb?.['patients'].upsert(patient);
    },
    [patientDocumentsAreEqual, patients, superVisionDb]
  );

  const updateConsult = useCallback(
    (consult: ConsultDocument | ConsultDocType) => {
      const oldConsult = consults.find((c) => c.id === consult.id);
      if (
        oldConsult &&
        consultDocumentsAreEqual(oldConsult, consult as ConsultDocument)
      ) {
        return;
      }
      superVisionDb?.['consults'].atomicUpsert(consult);
    },
    [consults, consultDocumentsAreEqual, superVisionDb]
  );

  useEffect(() => {
    if (superVisionDb) {
      superVisionDb['patients'].find().$.subscribe((value) => {
        setPatients(value);
      });

      superVisionDb['consults'].find().$.subscribe((value) => {
        const newConsults = JSON.parse(JSON.stringify(value));
        setConsults(newConsults);
      });
    }
  }, [superVisionDb]);

  useEffect(() => {
    if (!superVisionDb) {
      getSuperVisionDatabase()
        ?.then((db: RxDatabase | null) => {
          db && setSuperVisionDb(db);
        })
        .catch((error: Error) => {
          console.error(error);
        });
    }
  }, [superVisionDb]);

  const value = useMemo(
    () => ({
      patients,
      newPatient,
      updatePatient,
      consults,
      newConsult,
      updateConsult,
    }),
    [patients, newPatient, updatePatient, consults, newConsult, updateConsult]
  );

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = () => useContext(DatabaseContext);
