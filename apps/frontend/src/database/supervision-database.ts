import environment from '@environment';
import {
  indexedDB as fakeIndexedDB,
  IDBKeyRange as fakeIDBKeyRange,
} from 'fake-indexeddb';
import { addRxPlugin, createRxDatabase, RxDatabase } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/dexie';
import { RxDBReplicationGraphQLPlugin } from 'rxdb/plugins/replication-graphql';
import { RxDBUpdatePlugin } from 'rxdb/plugins/update';
import { runConsultReplication } from './consult/consult-replication';
import consultSchema from './consult/consult-schema';
import { patientSchema, runPatientReplication } from './patient';

let blocked = false;
let db: RxDatabase | null = null;

const addPlugins = async () => {
  addRxPlugin(RxDBReplicationGraphQLPlugin);
  addRxPlugin(RxDBUpdatePlugin);

  if (!environment.production) {
    await import('rxdb/plugins/dev-mode').then((module) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      addRxPlugin((module as any).RxDBDevModePlugin);
    });
  }
};

const createSuperVisionDatabase = async () => {
  await addPlugins();

  // Use fake indexedDB if in node environment
  const storage =
    (window.indexedDB && getRxStorageDexie()) ||
    getRxStorageDexie({
      indexedDB: fakeIndexedDB,
      IDBKeyRange: fakeIDBKeyRange,
    });

  db = await createRxDatabase({
    name: 'supervision-db',
    storage,
  });

  await db.addCollections({
    patients: {
      schema: patientSchema,
    },
    consults: {
      schema: consultSchema,
    },
  });

  db.collections['patients'].$.subscribe((event) => {
    console.log('RXDB EVENT: ', event);
  });

  await runPatientReplication(db);
  await runConsultReplication(db);
};

export const getSuperVisionDatabase = async () => {
  if (!db && !blocked) {
    blocked = true;
    await createSuperVisionDatabase();
    blocked = false;
  }
  return db;
};
