import {
  toTypedRxJsonSchema,
  ExtractDocumentTypeFromTypedRxJsonSchema,
  RxJsonSchema,
} from 'rxdb';

export const patientSchemaLiteral = {
  title: 'RxDB Patient Schema',
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      maxLength: 32, // <- GraphQL UUID max length
    },
    firstName: {
      type: 'string',
    },
    lastName: {
      type: 'string',
    },
    dateOfBirth: {
      type: 'string',
    },
    patientId: {
      type: 'string',
    },
    ethnicity: {
      type: 'string',
    },
    gender: {
      type: 'string',
    },
    school: {
      type: 'string',
    },
    yearLevel: {
      type: 'number',
    },
    room: {
      type: 'string',
    },
    streetAddress: {
      type: 'string',
    },
    suburb: {
      type: 'string',
    },
    city: {
      type: 'string',
    },
    postcode: {
      type: 'string',
    },
    caregiverFirstName: {
      type: 'string',
    },
    caregiverLastName: {
      type: 'string',
    },
    phoneNumber: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    adminNotes: {
      type: 'string',
    },
    deletedAt: {
      type: 'string',
    },
    updatedAt: {
      type: 'string',
    },
    consultIds: {
      type: 'array',
      uniqueItems: true,
      items: {
        type: 'string',
      },
    },
  },
  required: ['id'],
} as const;

export const patientSchemaTyped = toTypedRxJsonSchema(patientSchemaLiteral);
export type PatientDocType = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof patientSchemaTyped
>;
export const patientSchema: RxJsonSchema<PatientDocType> = patientSchemaLiteral;
