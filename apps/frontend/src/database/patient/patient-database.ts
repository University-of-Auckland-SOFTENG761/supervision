import environment from '@environment';
import { addRxPlugin, createRxDatabase, RxDatabase, RxDocument } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/dexie';
import patientSchema, { PatientDocType } from './patient-schema';
import { RxDBUpdatePlugin } from 'rxdb/plugins/update';
import DatabaseConstructor from '../database-constructor';
import { RxDBReplicationGraphQLPlugin } from 'rxdb/plugins/replication-graphql';
import { Ethnicities } from 'app/patients/ethnicity-select/ethnicity-select';
import { Gender } from 'app/patients/gender-select/gender-select';
import {
  indexedDB as fakeIndexedDB,
  IDBKeyRange as fakeIDBKeyRange,
} from 'fake-indexeddb';
import { v4 as uuidv4 } from 'uuid';

type ObjectWithRxdbMetaField = {
  _meta?: {
    [key: string]: unknown;
  };
};

type PatientDocument = RxDocument<PatientDocType> & ObjectWithRxdbMetaField;

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

const stripMetadata = (doc: PatientDocument) => {
  const { _meta, ...rest } = doc;
  return rest;
};

const toEnumCase = (str: Ethnicities | Gender | string) =>
  str.toUpperCase().replaceAll(' ', '');

const serializeEnums = (doc: PatientDocument) => {
  doc.ethnicity = doc.ethnicity ? toEnumCase(doc.ethnicity) : undefined;
  doc.gender = doc.gender ? toEnumCase(doc.gender) : undefined;
  return doc;
};

const deserializeEnums = (doc: PatientDocument) => {
  const ethnicityArray = Array.from(
    (Object.keys(Ethnicities) as Array<keyof typeof Ethnicities>).map((key) => {
      return { key, value: toEnumCase(Ethnicities[key]) };
    })
  );
  if (doc.ethnicity) {
    const ethnicityKey = ethnicityArray?.find(
      ({ key, value }) => value === doc.ethnicity
    )?.key;
    doc.ethnicity = ethnicityKey ? Ethnicities[ethnicityKey] : undefined;
  }

  const genderArray = Array.from(
    (Object.keys(Gender) as Array<keyof typeof Gender>).map((key) => {
      return { key, value: toEnumCase(Gender[key]) };
    })
  );

  if (doc.gender) {
    const genderKey = genderArray?.find(
      ({ key, value }) => value === doc.gender
    )?.key;
    doc.gender = genderKey ? Gender[genderKey] : undefined;
  }

  return doc;
};

const pullQueryBuilder = (doc: PatientDocument) => {
  const updatedAt = doc?.updatedAt
    ? new Date(doc.updatedAt).toISOString()
    : new Date(0).toISOString();
  const minUpdatedAtField = `minUpdatedAt: "${updatedAt}", `;

  const lastId = doc?.id ? doc.id : uuidv4();
  const lastIdField = `lastId: "${lastId}", `;

  const query = `{
    patientReplicationFeed(${minUpdatedAtField}${lastIdField}limit: 5) {
      id,
      revision,
      createdAt,
      deletedAt,
      updatedAt,
      firstName,
      lastName,
      dateOfBirth,
      gender,
      ethnicity,
      school,
      yearLevel,
      yearLevelLastUpdated,
      room,
      caregiverFirstName,
      caregiverLastName,
      phoneNumber,
      email,
      streetAddress,
      suburb,
      city,
      postcode,
      adminNotes,
      screeningList,
    }
  }`;

  return {
    query,
    variables: {},
  };
};

const pushQueryBuilder = (docs: PatientDocument[]) => {
  // Ensure that the doc has at least an id field and one of firstName, lastName, or dateOfBirth
  docs = docs.filter(
    (doc) => doc.id && (doc.firstName || doc.lastName || doc.dateOfBirth)
  );

  docs = docs.map((doc) => stripMetadata(serializeEnums(doc)));

  const query = `
          mutation SetPatient($patients: [SetPatientInput!]) {
            setPatients(setPatientsInput: $patients) {
              id # GraphQL does not allow returning void, so we return one id.
            }
          }
  `;
  const variables = {
    patients: docs,
  };

  return {
    query,
    variables,
  };
};

const deletionFilter = (doc: PatientDocument) => {
  doc = {
    ...doc,
    deletedAt:
      doc.deletedAt && new Date(doc.deletedAt) !== new Date(0)
        ? doc.deletedAt
        : undefined,
  };
  return doc;
};

const buildReplicationState = (database: RxDatabase) => {
  return database.collections['patients'].syncGraphQL({
    url: new URL('graphql', environment.api_url).toString(), // url to the GraphQL endpoint
    pull: {
      queryBuilder: pullQueryBuilder, // the queryBuilder from above
      batchSize: 5,
      modifier: (doc) => deserializeEnums(deletionFilter(doc)),
    },
    push: {
      queryBuilder: pushQueryBuilder,
      batchSize: 5,
      modifier: (doc) => serializeEnums(deletionFilter(doc)),
    },
    deletedFlag: 'deletedAt', // the flag which indicates if a pulled document is deleted
    live: true, // if this is true, rxdb will watch for ongoing changes and sync them, when false, a one-time-replication will be done
  });
};

const initializePatientDatabase = async () => {
  await addPlugins();

  // Use fake indexedDB if in node environment
  const storage =
    (window.indexedDB && getRxStorageDexie()) ||
    getRxStorageDexie({
      indexedDB: fakeIndexedDB,
      IDBKeyRange: fakeIDBKeyRange,
    });

  const db = await createRxDatabase({
    name: 'patientdb',
    storage,
  });

  await db.addCollections({
    patients: {
      schema: patientSchema,
    },
  });

  const replicationState = buildReplicationState(db);
  replicationState.run();

  replicationState.error$.subscribe((err) => {
    console.error(err);
    console.error(err.innerErrors);
  });

  return db;
};

export const patientDatabase = new DatabaseConstructor(
  initializePatientDatabase
);
