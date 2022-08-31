import { addRxPlugin, createRxDatabase } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/dexie';
import patientSchema from './patient-schema';
import { RxDBUpdatePlugin } from 'rxdb/plugins/update';
import DatabaseConstructor from './database-constructor';
addRxPlugin(RxDBUpdatePlugin);

const initializePatientDatabase = async () => {
  if (process.env['NODE_ENV'] !== 'production') {
    await import('rxdb/plugins/dev-mode').then((module) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      addRxPlugin((module as any).RxDBDevModePlugin);
    });
  }
  const db = await createRxDatabase({
    name: 'patientdb',
    storage: getRxStorageDexie(),
  });
  await db.addCollections({
    patients: {
      schema: patientSchema,
    },
  });
  return db;
};

export const patientDatabase: DatabaseConstructor = new DatabaseConstructor(
  initializePatientDatabase
);
