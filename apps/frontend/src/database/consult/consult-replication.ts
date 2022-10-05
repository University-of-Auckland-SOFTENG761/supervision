import environment from '@environment';
import { RxDatabase } from 'rxdb';
import { v4 as uuidv4 } from 'uuid';
import { getGraphQlHeaders } from 'database/authorisation';
import { ConsultDocument, stripMetadata } from 'database/rxdb-utils';

const pullQueryBuilder = (doc: ConsultDocument) => {
  const updatedAt = doc?.updatedAt
    ? new Date(doc.updatedAt).toISOString()
    : new Date(0).toISOString();
  const minUpdatedAtField = `minUpdatedAt: "${updatedAt}", `;

  const lastId = doc?.id ? doc.id : uuidv4();
  const lastIdField = `lastId: "${lastId}", `;

  const query = `{
    consultReplicationFeed(${minUpdatedAtField}${lastIdField}limit: 5) {
      id,
      revision,
      deletedAt,
      updatedAt,
      user {
        email
      },
      patient {
        id
      },
      dateConsentGiven,
      history,
      medication,
      visualAcuityLeft,
      visualAcuityRight,
      visualAcuityBoth,
      nearAcuityLeft,
      nearAcuityRight,
      nearAcuityBoth,
      coverTestDistance,
      coverTestNear,
      nearPointOfConvergence,
      motility,
      pupils,
      pupillaryDistance,
      otherField,
      eyePressureLeft,
      eyePressureRight,
      eyePressureTimestamp,
      isCyclopentolate,
      cyclopentolateTimestamp,
      isTropicamide,
      tropicamideTimestamp,
      binocularVision,
      anteriorHealth,
      posteriorHealth,
      diagnosis,
      management,
      layPersonNotes,
      spectacle {
        id,
        code,
        colour,
        lensType,
        heights,
        notes
      }
      recallDate,
      recallDescription,
      prevSpecRxGivenRightEyeSphere,
      prevSpecRxGivenRightCylinder,
      prevSpecRxGivenRightAxis,
      prevSpecRxGivenRightVA,
      prevSpecRxGivenRightAdd,
      prevSpecRxGivenLeftEyeSphere,
      prevSpecRxGivenLeftCylinder,
      prevSpecRxGivenLeftAxis,
      prevSpecRxGivenLeftVA,
      prevSpecRxGivenLeftAdd,
      prevSpecRxGivenBVA,
      habitualRightEyeSphere,
      habitualRightCylinder,
      habitualRightAxis,
      habitualRightVA,
      habitualRightAdd,
      habitualLeftEyeSphere,
      habitualLeftCylinder,
      habitualLeftAxis,
      habitualLeftVA,
      habitualLeftAdd,
      dryRetinoscopyRightEyeSphere,
      dryRetinoscopyRightCylinder,
      dryRetinoscopyRightAxis,
      dryRetinoscopyRightVA,
      dryRetinoscopyRightAdd,
      dryRetinoscopyLeftEyeSphere,
      dryRetinoscopyLeftCylinder,
      dryRetinoscopyLeftAxis,
      dryRetinoscopyLeftVA,
      dryRetinoscopyLeftAdd,
      autoRefractionRightEyeSphere,
      autoRefractionRightCylinder,
      autoRefractionRightAxis,
      autoRefractionRightVA,
      autoRefractionRightAdd,
      autoRefractionLeftEyeSphere,
      autoRefractionLeftCylinder,
      autoRefractionLeftAxis,
      autoRefractionLeftVA,
      autoRefractionLeftAdd,
      wetRefractionRightEyeSphere,
      wetRefractionRightCylinder,
      wetRefractionRightAxis,
      wetRefractionRightVA,
      wetRefractionRightAdd,
      wetRefractionLeftEyeSphere,
      wetRefractionLeftCylinder,
      wetRefractionLeftAxis,
      wetRefractionLeftVA,
      wetRefractionLeftAdd,
      subjectiveRefractionRightEyeSphere,
      subjectiveRefractionRightCylinder,
      subjectiveRefractionRightAxis,
      subjectiveRefractionRightVA,
      subjectiveRefractionRightAdd,
      subjectiveRefractionLeftEyeSphere,
      subjectiveRefractionLeftCylinder,
      subjectiveRefractionLeftAxis,
      subjectiveRefractionLeftVA,
      subjectiveRefractionLeftAdd,
      givenRefractionRightEyeSphere,
      givenRefractionRightCylinder,
      givenRefractionRightAxis,
      givenRefractionRightVA,
      givenRefractionRightAdd,
      givenRefractionLeftEyeSphere,
      givenRefractionLeftCylinder,
      givenRefractionLeftAxis,
      givenRefractionLeftVA,
      givenRefractionLeftAdd,
      givenRefractionBVA,
    }
  }`;

  return {
    query,
    variables: {},
  };
};

const pushQueryBuilder = (docs: ConsultDocument[]) => {
  // Ensure that the doc has at least an id field and date consent given
  docs = docs.filter((doc) => doc.id && doc.dateConsentGiven);

  const strippedDocs = docs.map((doc) => stripMetadata(doc));

  const query = `
    mutation SetConsults($consults: [SetConsultInput!]) {
      setConsults(setConsultInputArray: $consults) {
        id # GraphQL does not allow returning void, so we return one id.
      }
    }
  `;

  const variables = {
    consults: strippedDocs,
  };
  return {
    query,
    variables,
  };
};

const deletionFilter = (doc: ConsultDocument) => {
  doc = {
    ...doc,
    deletedAt:
      doc.deletedAt && new Date(doc.deletedAt) !== new Date(0)
        ? doc.deletedAt
        : undefined,
  };
  return doc;
};

export const buildConsultReplicationState = async (database: RxDatabase) => {
  const headers = await getGraphQlHeaders();
  return headers
    ? database.collections['consults'].syncGraphQL({
        url: new URL('graphql', environment.api_url).toString(), // url to the GraphQL endpoint
        pull: {
          queryBuilder: pullQueryBuilder, // the queryBuilder from above
          batchSize: 5,
          modifier: (doc) => ({
            ...deletionFilter(doc),
            userEmail: doc.user.email,
            patientId: doc.patient.id,
            spectacleId: doc.spectacle?.id,
            spectacleCode: doc.spectacle?.code,
            spectacleColour: doc.spectacle?.colour,
            spectacleLensType: doc.spectacle?.lensType,
            spectacleHeights: doc.spectacle?.heights,
            spectacleNotes: doc.spectacle?.notes,
          }),
        },
        push: {
          queryBuilder: pushQueryBuilder,
          batchSize: 5,
          modifier: (doc) => deletionFilter(doc),
        },
        deletedFlag: 'deletedAt', // the flag which indicates if a pulled document is deleted
        live: true, // if this is true, rxdb will watch for ongoing changes and sync them, when false, a one-time-replication will be done
        headers,
      })
    : null;
};

export const runConsultReplication = async (db: RxDatabase) => {
  console.log('Running consult replication');
  const replicationState = await buildConsultReplicationState(db);
  console.log(
    replicationState
      ? 'Consult replication started'
      : 'Consult replication not started'
  );
  try {
    replicationState?.run();
  } catch (e) {
    console.log('Consult replication failed', e);
  }

  return replicationState;
};
