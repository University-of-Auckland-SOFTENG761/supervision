import {
  toTypedRxJsonSchema,
  ExtractDocumentTypeFromTypedRxJsonSchema,
  RxJsonSchema,
} from 'rxdb';

export const consultSchemaLiteral = {
  title: 'RxDB Consult Schema',
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      maxLength: 32, // <- GraphQL UUID max length
    },
    userEmail: {
      type: 'string',
    },
    patientId: {
      type: 'string',
    },
    dateConsentGiven: {
      type: 'string',
    },
    history: {
      type: 'string',
    },
    medication: {
      type: 'string',
    },
    visualAcuityLeft: {
      type: 'string',
    },
    visualAcuityRight: {
      type: 'string',
    },
    visualAcuityBoth: {
      type: 'string',
    },
    nearAcuityLeft: {
      type: 'string',
    },
    nearAcuityRight: {
      type: 'string',
    },
    nearAcuityBoth: {
      type: 'string',
    },
    coverTestDistance: {
      type: 'string',
    },
    coverTestNear: {
      type: 'string',
    },
    nearPointOfConvergence: {
      type: 'string',
    },
    motility: {
      type: 'string',
    },
    pupils: {
      type: 'string',
    },
    spectaclePupillaryDistance: {
      type: 'number',
    },
    otherField: {
      type: 'string',
    },
    eyePressureLeft: {
      type: 'number',
    },
    eyePressureRight: {
      type: 'number',
    },
    eyePressureTimestamp: {
      type: 'string',
    },
    isCyclopentolate: {
      type: 'boolean',
    },
    cyclopentolateTimestamp: {
      type: 'string',
    },
    isTropicamide: {
      type: 'boolean',
    },
    tropicamideTimestamp: {
      type: 'string',
    },
    binocularVision: {
      type: 'string',
    },
    anteriorHealth: {
      type: 'string',
    },
    posteriorHealth: {
      type: 'string',
    },
    diagnosis: {
      type: 'string',
    },
    management: {
      type: 'string',
    },
    layPersonNotes: {
      type: 'string',
    },
    spectacleId: {
      type: 'string',
    },
    spectacleCode: {
      type: 'string',
    },
    spectacleColour: {
      type: 'string',
    },
    spectacleLensType: {
      type: 'string',
    },
    spectacleHeights: {
      type: 'string',
    },
    spectacleNotes: {
      type: 'string',
    },
    recallDate: {
      type: 'string',
    },
    recallDescription: {
      type: 'string',
    },
    prevSpecRxGivenRightEyeSphere: {
      type: 'number',
    },
    prevSpecRxGivenRightCylinder: {
      type: 'number',
    },
    prevSpecRxGivenRightAxis: {
      type: 'number',
    },
    prevSpecRxGivenRightVA: {
      type: 'string',
    },
    prevSpecRxGivenRightAdd: {
      type: 'number',
    },
    prevSpecRxGivenLeftEyeSphere: {
      type: 'number',
    },
    prevSpecRxGivenLeftCylinder: {
      type: 'number',
    },
    prevSpecRxGivenLeftAxis: {
      type: 'number',
    },
    prevSpecRxGivenLeftVA: {
      type: 'string',
    },
    prevSpecRxGivenLeftAdd: {
      type: 'number',
    },
    prevSpecRxGivenBVA: {
      type: 'number',
    },
    habitualRightEyeSphere: {
      type: 'number',
    },
    habitualRightCylinder: {
      type: 'number',
    },
    habitualRightAxis: {
      type: 'number',
    },
    habitualRightVA: {
      type: 'string',
    },
    habitualRightAdd: {
      type: 'number',
    },
    habitualLeftEyeSphere: {
      type: 'number',
    },
    habitualLeftCylinder: {
      type: 'number',
    },
    habitualLeftAxis: {
      type: 'number',
    },
    habitualLeftVA: {
      type: 'string',
    },
    habitualLeftAdd: {
      type: 'number',
    },
    dryRetinoscopyRightEyeSphere: {
      type: 'number',
    },
    dryRetinoscopyRightCylinder: {
      type: 'number',
    },
    dryRetinoscopyRightAxis: {
      type: 'number',
    },
    dryRetinoscopyRightVA: {
      type: 'string',
    },
    dryRetinoscopyRightAdd: {
      type: 'number',
    },
    dryRetinoscopyLeftEyeSphere: {
      type: 'number',
    },
    dryRetinoscopyLeftCylinder: {
      type: 'number',
    },
    dryRetinoscopyLeftAxis: {
      type: 'number',
    },
    dryRetinoscopyLeftVA: {
      type: 'string',
    },
    dryRetinoscopyLeftAdd: {
      type: 'number',
    },
    autoRefractionRightEyeSphere: {
      type: 'number',
    },
    autoRefractionRightCylinder: {
      type: 'number',
    },
    autoRefractionRightAxis: {
      type: 'number',
    },
    autoRefractionRightVA: {
      type: 'string',
    },
    autoRefractionRightAdd: {
      type: 'number',
    },
    autoRefractionLeftEyeSphere: {
      type: 'number',
    },
    autoRefractionLeftCylinder: {
      type: 'number',
    },
    autoRefractionLeftAxis: {
      type: 'number',
    },
    autoRefractionLeftVA: {
      type: 'string',
    },
    autoRefractionLeftAdd: {
      type: 'number',
    },
    wetRefractionRightEyeSphere: {
      type: 'number',
    },
    wetRefractionRightCylinder: {
      type: 'number',
    },
    wetRefractionRightAxis: {
      type: 'number',
    },
    wetRefractionRightVA: {
      type: 'string',
    },
    wetRefractionRightAdd: {
      type: 'number',
    },
    wetRefractionLeftEyeSphere: {
      type: 'number',
    },
    wetRefractionLeftCylinder: {
      type: 'number',
    },
    wetRefractionLeftAxis: {
      type: 'number',
    },
    wetRefractionLeftVA: {
      type: 'string',
    },
    wetRefractionLeftAdd: {
      type: 'number',
    },
    subjectiveRefractionRightEyeSphere: {
      type: 'number',
    },
    subjectiveRefractionRightCylinder: {
      type: 'number',
    },
    subjectiveRefractionRightAxis: {
      type: 'number',
    },
    subjectiveRefractionRightVA: {
      type: 'string',
    },
    subjectiveRefractionRightAdd: {
      type: 'number',
    },
    subjectiveRefractionLeftEyeSphere: {
      type: 'number',
    },
    subjectiveRefractionLeftCylinder: {
      type: 'number',
    },
    subjectiveRefractionLeftAxis: {
      type: 'number',
    },
    subjectiveRefractionLeftVA: {
      type: 'string',
    },
    subjectiveRefractionLeftAdd: {
      type: 'number',
    },
    givenRefractionRightEyeSphere: {
      type: 'number',
    },
    givenRefractionRightCylinder: {
      type: 'number',
    },
    givenRefractionRightAxis: {
      type: 'number',
    },
    givenRefractionRightVA: {
      type: 'string',
    },
    givenRefractionRightAdd: {
      type: 'number',
    },
    givenRefractionLeftEyeSphere: {
      type: 'number',
    },
    givenRefractionLeftCylinder: {
      type: 'number',
    },
    givenRefractionLeftAxis: {
      type: 'number',
    },
    givenRefractionLeftVA: {
      type: 'string',
    },
    givenRefractionLeftAdd: {
      type: 'number',
    },
    givenRefractionBVA: {
      type: 'string',
    },
    deletedAt: {
      type: 'string',
    },
    updatedAt: {
      type: 'string',
    },
  },
  required: ['id', 'patientId', 'userEmail', 'dateConsentGiven'],
} as const;

export const consultSchemaTyped = toTypedRxJsonSchema(consultSchemaLiteral);
export type ConsultDocType = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof consultSchemaTyped
>;
const consultSchema: RxJsonSchema<ConsultDocType> = consultSchemaLiteral;

export default consultSchema;
