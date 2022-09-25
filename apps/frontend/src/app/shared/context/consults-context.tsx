import { useAuth0 } from '@auth0/auth0-react';
import { runConsultReplication, getSuperVisionDatabase } from 'database';
import { ConsultDocument } from 'database/rxdb-utils';
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

interface IConsultsContext {
  consults: ConsultDocument[];
  newPatient: () => string;
  updatePatient: (consult: ConsultDocument) => void;
}

const ConsultsContext = createContext<Partial<IConsultsContext>>({});

type ConsultsProviderProps = {
  children: React.ReactNode;
};

export const ConsultsProvider = ({ children }: ConsultsProviderProps) => {
  const [superVisionDb, setSuperVisionDb] = useState<RxDatabase | null>(null);
  const [consultsReplicationState, setConsultsReplicationState] =
    useState<RxGraphQLReplicationState<ConsultDocument> | null>(null);
  const [consults, setConsults] = useState<ConsultDocument[]>([]);
  const { isAuthenticated, user } = useAuth0();
  const { online } = useNetwork();
  const userEmail = sessionStorage.getItem('userEmail');

  const restartReplication = async () => {
    // console.log('Restarting replication');
    // await consultsReplicationState?.cancel();
    // const newReplicationState =
    //   superVisionDb && (await runConsultReplication(superVisionDb));
    // setConsultsReplicationState(newReplicationState);
  };

  const handleReplicationError = async (
    err: RxReplicationError<ConsultDocument>
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
    if (consultsReplicationState) {
      consultsReplicationState.error$.subscribe(handleReplicationError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [consultsReplicationState]);

  useEffect(() => {
    if (isAuthenticated && !consultsReplicationState) restartReplication();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, consultsReplicationState]);

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

  const consultsAreEqual = useCallback(
    (a: ConsultDocument, b: ConsultDocument) => {
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

  const updateConsult = useCallback(
    (consult: ConsultDocument) => {
      const oldConsult = consults.find((p) => p.id === consult.id);
      if (
        oldConsult &&
        consultsAreEqual(
          oldConsult as ConsultDocument,
          consult as ConsultDocument
        )
      ) {
        return;
      }
      superVisionDb?.['consults'].atomicUpsert(consult);
    },
    [consults, consultsAreEqual, superVisionDb]
  );

  useEffect(() => {
    if (superVisionDb) {
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
      consults,
      newConsult,
      updateConsult,
    }),
    [consults, newConsult, updateConsult]
  );

  return (
    <ConsultsContext.Provider value={value}>
      {children}
    </ConsultsContext.Provider>
  );
};

export const useConsults = () => useContext(ConsultsContext);
