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
const pullQueryBuilder = (doc: RxDocument<any>) => {
  if (!doc) {
    doc = {
      id: '',
      updatedAt: new Date(0).toISOString(),
    };
  }

  doc = {
    ...doc,
    updatedAt: new Date(doc.updatedAt).toISOString(),
  };

  const query = `{
    patientReplicationFeed(minUpdatedAt: "${doc.updatedAt}", limit: 5) {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const pushQueryBuilder = (docs: RxDocument<any>[]) => {
  // Ensure that the backend's required fields are not null or undefined or empty string
  docs = docs.filter((doc) => doc.id);

  // Remove the "_meta" field from the documents
  docs = docs.map((doc) => {
    const { _meta, _deleted, ...rest } = doc;
    return rest;
  });

  console.log(docs);

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const deletionFilter = (doc: RxDocument<any>) => {
  doc = {
    ...doc,
    deletedAt: new Date(doc.deletedAt).getTime() ? doc.deletedAt : null,
    _deleted: new Date(doc.deletedAt).getTime() ? true : false,
  };
  return doc;
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
      modifier: deletionFilter,
    },
    push: {
      queryBuilder: pushQueryBuilder,
      batchSize: 5,
      modifier: deletionFilter,
    },
    deletedFlag: 'deletedAt', // the flag which indicates if a pulled document is deleted
    live: true, // if this is true, rxdb will watch for ongoing changes and sync them, when false, a one-time-replication will be done
  });
  replicationState.run();
  replicationState.error$.subscribe((err) => {
    console.error(err);
    console.log(err.innerErrors);
  });
  return db;
};

export const patientDatabase = new DatabaseConstructor(
  initializePatientDatabase
);
