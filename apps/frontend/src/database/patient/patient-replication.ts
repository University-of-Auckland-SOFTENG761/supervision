import environment from '@environment';
import { RxDatabase } from 'rxdb';
import { Ethnicities } from 'app/patients/ethnicity-select/ethnicity-select';
import { Gender } from 'app/patients/gender-select/gender-select';
import { v4 as uuidv4 } from 'uuid';
import { getGraphQlHeaders } from 'database/authorisation';
import { PatientDocument, stripMetadata } from 'database/rxdb-utils';

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

export const buildPatientReplicationState = async (database: RxDatabase) => {
  const headers = await getGraphQlHeaders();
  return headers
    ? database.collections['patients'].syncGraphQL({
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
        headers,
      })
    : null;
};

export const runPatientReplication = async (db: RxDatabase) => {
  console.log('Running patient replication');
  const replicationState = await buildPatientReplicationState(db);
  console.log(
    replicationState
      ? 'Patient replication started'
      : 'Patient replication not started'
  );
  replicationState?.run();

  return replicationState;
};
