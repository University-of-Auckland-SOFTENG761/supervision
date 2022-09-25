import { useAuth0 } from '@auth0/auth0-react';
import { runPatientReplication, getSuperVisionDatabase } from 'database';
import { PatientDocument } from 'database/rxdb-utils';
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

interface IPatientsContext {
  patients: PatientDocument[];
  newPatient: () => string;
  updatePatient: (patient: PatientDocument) => void;
}

const PatientsContext = createContext<Partial<IPatientsContext>>({});

type PatientsProviderProps = {
  children: React.ReactNode;
};

export const PatientsProvider = ({ children }: PatientsProviderProps) => {
  const [superVisionDb, setSuperVisionDb] = useState<RxDatabase | null>(null);
  const [patientsReplicationState, setPatientsReplicationState] =
    useState<RxGraphQLReplicationState<PatientDocument> | null>(null);
  const [patients, setPatients] = useState<PatientDocument[]>([]);
  const { isAuthenticated } = useAuth0();

  const restartReplication = async () => {
    console.log('Restarting replication');
    await patientsReplicationState?.cancel();
    const newReplicationState =
      superVisionDb && (await runPatientReplication(superVisionDb));
    setPatientsReplicationState(newReplicationState);
  };

  const handleReplicationError = async (
    err: RxReplicationError<PatientDocument>
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
      patientsReplicationState.received$.subscribe((docs) =>
        console.log('received data from backend:', docs)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientsReplicationState]);

  useEffect(() => {
    if (isAuthenticated && !patientsReplicationState) restartReplication();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, patientsReplicationState]);

  const newPatient = useCallback(() => {
    const newPatient = {
      id: uuid(),
    };
    superVisionDb?.['patients'].insert(newPatient);
    return newPatient.id;
  }, [superVisionDb]);

  const patientsAreEqual = useCallback(
    (a: PatientDocument, b: PatientDocument) => {
      const { _attachments, _deleted, _meta, _rev, ...aWithoutMeta } = a;
      const {
        _attachments: bAttachments,
        _deleted: bDeleted,
        _meta: bMeta,
        _rev: bRev,
        ...bWithoutMeta
      } = b;
      return JSON.stringify(aWithoutMeta) === JSON.stringify(bWithoutMeta);
    },
    []
  );

  const updatePatient = useCallback(
    (patient: PatientDocument) => {
      const oldPatient = patients.find((p) => p.id === patient.id);
      if (
        oldPatient &&
        patientsAreEqual(
          oldPatient as PatientDocument,
          patient as PatientDocument
        )
      ) {
        return;
      }
      superVisionDb?.['patients'].atomicUpsert(patient);
    },
    [patients, patientsAreEqual, superVisionDb]
  );

  useEffect(() => {
    if (superVisionDb) {
      superVisionDb['patients'].find().$.subscribe((value) => {
        setPatients(value);
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
    }),
    [patients, newPatient, updatePatient]
  );

  return (
    <PatientsContext.Provider value={value}>
      {children}
    </PatientsContext.Provider>
  );
};

export const usePatients = () => useContext(PatientsContext);
