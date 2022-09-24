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
    pupillaryDistance: {
      type: 'string',
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
    habitualGivenRightAxis: {
      type: 'number',
    },
    habitualGivenRightVA: {
      type: 'string',
    },
    habitualGivenRightAdd: {
      type: 'number',
    },
    habitualGivenLeftEyeSphere: {
      type: 'number',
    },
    habitualGivenLeftCylinder: {
      type: 'number',
    },
    habitualGivenLeftAxis: {
      type: 'number',
    },
    habitualGivenLeftVA: {
      type: 'string',
    },
    habitualGivenLeftAdd: {
      type: 'number',
    },
    dryRetinoscopyRightEyeSphere: {
      type: 'number',
    },
    dryRetinoscopyRightCylinder: {
      type: 'number',
    },
    dryRetinoscopyGivenRightAxis: {
      type: 'number',
    },
    dryRetinoscopyGivenRightVA: {
      type: 'string',
    },
    dryRetinoscopyGivenRightAdd: {
      type: 'number',
    },
    dryRetinoscopyGivenLeftEyeSphere: {
      type: 'number',
    },
    dryRetinoscopyGivenLeftCylinder: {
      type: 'number',
    },
    dryRetinoscopyGivenLeftAxis: {
      type: 'number',
    },
    dryRetinoscopyGivenLeftVA: {
      type: 'string',
    },
    dryRetinoscopyGivenLeftAdd: {
      type: 'number',
    },
    autoRefractionRightEyeSphere: {
      type: 'number',
    },
    autoRefractionRightCylinder: {
      type: 'number',
    },
    autoRefractionGivenRightAxis: {
      type: 'number',
    },
    autoRefractionGivenRightVA: {
      type: 'string',
    },
    autoRefractionGivenRightAdd: {
      type: 'number',
    },
    autoRefractionGivenLeftEyeSphere: {
      type: 'number',
    },
    autoRefractionGivenLeftCylinder: {
      type: 'number',
    },
    autoRefractionGivenLeftAxis: {
      type: 'number',
    },
    autoRefractionGivenLeftVA: {
      type: 'string',
    },
    autoRefractionGivenLeftAdd: {
      type: 'number',
    },
    wetRefractionRightEyeSphere: {
      type: 'number',
    },
    wetRefractionRightCylinder: {
      type: 'number',
    },
    wetRefractionGivenRightAxis: {
      type: 'number',
    },
    wetRefractionGivenRightVA: {
      type: 'numstringber',
    },
    wetRefractionGivenRightAdd: {
      type: 'number',
    },
    wetRefractionGivenLeftEyeSphere: {
      type: 'number',
    },
    wetRefractionGivenLeftCylinder: {
      type: 'number',
    },
    wetRefractionGivenLeftAxis: {
      type: 'number',
    },
    wetRefractionGivenLeftVA: {
      type: 'string',
    },
    wetRefractionGivenLeftAdd: {
      type: 'number',
    },
    subjectiveRefractionRightEyeSphere: {
      type: 'number',
    },
    subjectiveRefractionRightCylinder: {
      type: 'number',
    },
    subjectiveRefractionGivenRightAxis: {
      type: 'number',
    },
    subjectiveRefractionGivenRightVA: {
      type: 'string',
    },
    subjectiveRefractionGivenRightAdd: {
      type: 'number',
    },
    subjectiveRefractionGivenLeftEyeSphere: {
      type: 'number',
    },
    subjectiveRefractionGivenLeftCylinder: {
      type: 'number',
    },
    subjectiveRefractionGivenLeftAxis: {
      type: 'number',
    },
    subjectiveRefractionGivenLeftVA: {
      type: 'string',
    },
    subjectiveRefractionGivenLeftAdd: {
      type: 'number',
    },
    givenRefractionRightEyeSphere: {
      type: 'number',
    },
    givenRefractionRightCylinder: {
      type: 'number',
    },
    givenRefractionGivenRightAxis: {
      type: 'number',
    },
    givenRefractionGivenRightVA: {
      type: 'string',
    },
    givenRefractionGivenRightAdd: {
      type: 'number',
    },
    givenRefractionGivenLeftEyeSphere: {
      type: 'number',
    },
    givenRefractionGivenLeftCylinder: {
      type: 'number',
    },
    givenRefractionGivenLeftAxis: {
      type: 'number',
    },
    givenRefractionGivenLeftVA: {
      type: 'string',
    },
    givenRefractionGivenLeftAdd: {
      type: 'number',
    },
    givenRefractionGivenBVA: {
      type: 'string',
    },
    deletedAt: {
      type: 'string',
    },
    updatedAt: {
      type: 'string',
    },
  },
  required: ['id'],
} as const;

const consultSchemaTyped = toTypedRxJsonSchema(consultSchemaLiteral);
export type ConsultDocType = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof consultSchemaTyped
>;
const consultSchema: RxJsonSchema<ConsultDocType> = consultSchemaLiteral;

export default consultSchema;
