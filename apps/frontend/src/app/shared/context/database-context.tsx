import { useAuth0 } from '@auth0/auth0-react';
import {
  runPatientReplication,
  getSuperVisionDatabase,
  runConsultReplication,
} from 'database';
import { ConsultDocument, PatientDocument } from 'database/rxdb-utils';
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
import { uuid } from 'uuidv4';
import { useNetwork } from '../hooks';

interface IDataBaseContext {
  patients: PatientDocument[];
  newPatient: () => string;
  updatePatient: (patient: PatientDocument) => void;
  consults: ConsultDocument[];
  newConsult: (patientId: string) => string | undefined;
  updateConsult: (consult: ConsultDocument) => void;
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
    const newPatient = {
      id: uuid(),
    };
    superVisionDb?.['patients'].insert(newPatient);
    return newPatient.id;
  }, [superVisionDb]);

  const newConsult = useCallback(
    (patientId: string) => {
      if (!user || (!online && !userEmail)) return;

      const newConsult = {
        id: uuid(),
        userEmail: online ? user.email : userEmail,
        patientId,
        dateConsentGiven: new Date(Date.now()).toISOString(),
      };
      superVisionDb?.['consults'].insert(newConsult);
      return newConsult.id;
    },
    [online, superVisionDb, user, userEmail]
  );

  const documentsAreEqual = useCallback(
    (
      a: PatientDocument | ConsultDocument,
      b: PatientDocument | ConsultDocument
    ) => {
      return JSON.stringify(a) === JSON.stringify(b);
    },
    []
  );

  const updatePatient = useCallback(
    (patient: PatientDocument) => {
      const oldPatient = patients.find((p) => p.id === patient.id);
      if (
        oldPatient &&
        documentsAreEqual(
          oldPatient as PatientDocument,
          patient as PatientDocument
        )
      ) {
        return;
      }
      superVisionDb?.['patients'].atomicUpsert(patient);
    },
    [patients, documentsAreEqual, superVisionDb]
  );

  const updateConsult = useCallback(
    (consult: ConsultDocument) => {
      const oldConsult = consults.find((p) => p.id === consult.id);
      if (
        oldConsult &&
        documentsAreEqual(
          oldConsult as ConsultDocument,
          consult as ConsultDocument
        )
      ) {
        return;
      }
      superVisionDb?.['consults'].atomicUpsert(consult);
    },
    [consults, documentsAreEqual, superVisionDb]
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
