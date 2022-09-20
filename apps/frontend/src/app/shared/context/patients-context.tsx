import { useAuth0 } from '@auth0/auth0-react';
import { IPatient } from '@patients';
import { buildReplicationState, patientDatabase } from 'database';
import { PatientDocType } from 'database/patient/patient-schema';
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

export type ConnectionStatus =
  | 'connected'
  | 'connecting'
  | 'disconnected'
  | 'unauthenticated'
  | 'unknown';

interface IPatientsContext {
  patients: IPatient[];
  newPatient: () => string;
  updatePatient: (patient: IPatient) => void;
  connectionStatus: ConnectionStatus;
}

const PatientsContext = createContext<Partial<IPatientsContext>>({});

type PatientsProviderProps = {
  children: React.ReactNode;
};

export const PatientsProvider = ({ children }: PatientsProviderProps) => {
  const [patientsDb, setPatientsDb] = useState<RxDatabase | null | undefined>();
  const [patientsReplicationState, setPatientsReplicationState] = useState<
    RxGraphQLReplicationState<PatientDocType> | null | undefined
  >();
  const [patients, setPatients] = useState<IPatient[]>([]);
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus>('unknown');
  const { isAuthenticated, isLoading } = useAuth0();

  const restartReplication = async () => {
    await patientsReplicationState?.cancel();
    const newReplicationState =
      patientsDb && (await buildReplicationState(patientsDb));
    newReplicationState?.run();
    setPatientsReplicationState(newReplicationState);
    setConnectionStatus('connecting');
  };

  const handleReplicationError = async (
    err: RxReplicationError<PatientDocType>
  ) => {
    if (err.message === 'Failed to fetch') {
      setConnectionStatus('disconnected');
      return;
    }

    if (
      err.innerErrors?.length > 0 &&
      err.innerErrors?.some(
        (innerError: { extensions?: { code: string } }) =>
          innerError.extensions?.code === 'UNAUTHENTICATED'
      )
    ) {
      if (
        !isAuthenticated &&
        !isLoading &&
        connectionStatus !== 'disconnected'
      ) {
        setConnectionStatus('unauthenticated');
        return;
      } else if (
        err.innerErrors?.some(
          (innerError: { message?: string }) =>
            innerError.message === 'jwt malformed' ||
            innerError.message === 'No auth token'
        )
      ) {
        await restartReplication();
        return;
      }
    }

    // Display unhandled errors
    console.error(err);
    err.innerErrors?.length > 0 &&
      err.innerErrors.forEach((e: Error) => console.error(e));
  };

  const handleReplicationResponse = () => {
    setConnectionStatus('connected');
  };

  useEffect(() => {
    patientsReplicationState &&
      patientsReplicationState.error$.subscribe(handleReplicationError);
    patientsReplicationState &&
      patientsReplicationState.received$.subscribe(handleReplicationResponse);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientsReplicationState]);

  const newPatient = useCallback(() => {
    const newPatient = {
      id: uuid(),
    };
    patientsDb?.['patients'].insert(newPatient);
    return newPatient.id;
  }, [patientsDb]);

  type CompletePatientType = PatientDocType & {
    _attachments: unknown;
    _deleted: unknown;
    _meta: unknown;
    _rev: unknown;
  };
  const patientsAreEqual = useCallback(
    (a: CompletePatientType, b: CompletePatientType) => {
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
    (patient: IPatient) => {
      const oldPatient = patients.find((p) => p.id === patient.id);
      if (
        oldPatient &&
        patientsAreEqual(
          oldPatient as CompletePatientType,
          patient as CompletePatientType
        )
      ) {
        return;
      }
      patientsDb?.['patients'].atomicUpsert(patient);
    },
    [patients, patientsAreEqual, patientsDb]
  );

  useEffect(() => {
    if (patientsDb) {
      patientsDb['patients'].find().$.subscribe((value) => {
        const newPatients = JSON.parse(JSON.stringify(value));
        setPatients(newPatients);
      });
    }
  }, [patientsDb]);

  useEffect(() => {
    if (!patientsDb) {
      patientDatabase
        .get()
        ?.then(
          ({
            db,
            replicationState,
          }: {
            db: RxDatabase | null;
            replicationState: RxGraphQLReplicationState<PatientDocType> | null;
          }) => {
            db && setPatientsDb(db);
            replicationState && setPatientsReplicationState(replicationState);
          }
        )
        .catch((error: Error) => {
          console.error(error);
        });
    }
  }, [patientsDb]);

  const value = useMemo(
    () => ({
      patients,
      newPatient,
      updatePatient,
      connectionStatus,
    }),
    [patients, newPatient, updatePatient, connectionStatus]
  );

  return (
    <PatientsContext.Provider value={value}>
      {children}
    </PatientsContext.Provider>
  );
};

export const usePatients = () => useContext(PatientsContext);
