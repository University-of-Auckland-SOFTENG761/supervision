import { useAuth0 } from '@auth0/auth0-react';
import {
  runPatientReplication,
  getSuperVisionDatabase,
  runConsultReplication,
  PatientDocType,
  ConsultDocType,
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
import { RxCollection, RxDatabase } from 'rxdb';
import { RxReplicationError } from 'rxdb/dist/types/plugins/replication';
import { RxGraphQLReplicationState } from 'rxdb/dist/types/plugins/replication-graphql';
import { v4 as uuidv4 } from 'uuid';
import { useNetwork } from './network-context';

interface IDataBaseContext {
  patientsCollection: RxCollection<PatientDocType>;
  newPatient: () => string;
  consultsCollection: RxCollection<ConsultDocType>;
  newConsult: (patientId: string) => Promise<string | undefined>;
}

const DatabaseContext = createContext<Partial<IDataBaseContext>>({});

type DatabaseProviderProps = {
  children: React.ReactNode;
};

export const DatabaseProvider = ({ children }: DatabaseProviderProps) => {
  const [superVisionDb, setSuperVisionDb] = useState<RxDatabase | null>(null);
  const patientsCollection = superVisionDb?.collections['patients'];
  const consultsCollection = superVisionDb?.collections['consults'];

  const [patientsReplicationState, setPatientsReplicationState] =
    useState<RxGraphQLReplicationState<PatientDocument> | null>(null);
  const [consultsReplicationState, setConsultsReplicationState] =
    useState<RxGraphQLReplicationState<ConsultDocument> | null>(null);

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
    async (patientId: string) => {
      if (!user || (!online && !userEmail) || !patientsCollection) return;
      const patient = await patientsCollection
        .findOne({ selector: { id: patientId } })
        .exec();

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
    [user, online, userEmail, patientsCollection, superVisionDb]
  );

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
      patientsCollection,
      newPatient,
      consultsCollection,
      newConsult,
    }),
    [patientsCollection, newPatient, consultsCollection, newConsult]
  );

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = () => useContext(DatabaseContext);
