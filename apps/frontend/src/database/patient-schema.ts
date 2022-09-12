import { RxJsonSchema } from 'rxdb';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const patientSchema: RxJsonSchema<any> = {
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
    year: {
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
    parentName: {
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
  },
  required: ['id'],
};

export default patientSchema;
