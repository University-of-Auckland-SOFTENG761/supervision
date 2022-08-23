import { RxJsonSchema } from 'rxdb';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const patientSchema: RxJsonSchema<any> = {
  title: 'RxDB Patient Schema',
  version: 0,
  primaryKey: 'uid',
  type: 'object',
  properties: {
    uid: {
      type: 'string',
      maxLength: 36, // <- GraphQL UUID max length
    },
    firstName: {
      type: 'string',
    },
    lastName: {
      type: 'string',
    },
    dob: {
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
    address: {
      type: 'object',
      properties: {
        street: {
          type: 'string',
        },
        suburb: {
          type: 'string',
        },
        city: {
          type: 'string',
        },
        postCode: {
          type: 'string',
        },
      },
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
    notes: {
      type: 'string',
    },
  },
  required: ['firstName', 'lastName', 'uid'],
};

export default patientSchema;
