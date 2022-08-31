import { addRxPlugin, createRxDatabase, RxDocument } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/dexie';
import patientSchema from './patient-schema';
import { RxDBUpdatePlugin } from 'rxdb/plugins/update';
import DatabaseConstructor from './database-constructor';
import { RxDBReplicationGraphQLPlugin } from 'rxdb/plugins/replication-graphql';

const addPlugins = async () => {
  addRxPlugin(RxDBReplicationGraphQLPlugin);
  addRxPlugin(RxDBUpdatePlugin);

  if (process.env['NODE_ENV'] !== 'production') {
    await import('rxdb/plugins/dev-mode').then((module) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      addRxPlugin((module as any).RxDBDevModePlugin);
    });
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const pullQueryBuilder = async (doc: RxDocument<any>) => {
  if (!doc) {
    doc = {
      id: '',
      updatedAt: 0,
    };
  }

  const query = `{
    userReplicationFeed(lastId: "${doc.id}", minUpdatedAt: ${doc.updatedAt}, limit: 5) {
      id,
      firstName,
      lastName,
      updatedAt,
      deletedAt,
    }
  }`;

  return {
    query,
    variables: {},
  };
};

const initializePatientDatabase = async () => {
  await addPlugins();
  const db = await createRxDatabase({
    name: 'patientdb',
    storage: getRxStorageDexie(),
  });
  await db.addCollections({
    patients: {
      schema: patientSchema,
    },
  });
  const replicationState = db.collections['patients'].syncGraphQL({
    url: 'http://localhost:3333/graphql', // url to the GraphQL endpoint
    pull: {
      queryBuilder: pullQueryBuilder, // the queryBuilder from above
      batchSize: 5,
    },
    deletedFlag: 'deletedAt', // the flag which indicates if a pulled document is deleted
    live: true, // if this is true, rxdb will watch for ongoing changes and sync them, when false, a one-time-replication will be done
  });
  replicationState.received$.subscribe((response) =>
    console.log('response from graphql', response)
  );
  replicationState.run();
  return db;
};

export const patientDatabase = new DatabaseConstructor(
  initializePatientDatabase
);
