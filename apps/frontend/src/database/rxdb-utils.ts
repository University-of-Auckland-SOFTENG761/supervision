import { RxDocument } from 'rxdb';
import { PatientDocType } from './patient';
import { ConsultDocType } from './consult';

export type ObjectWithRxdbMetaField = {
  _meta?: {
    [key: string]: unknown;
  };
  _attachments: unknown;
  _deleted: unknown;
  _rev: unknown;
};

export type DatabaseDocument<T> = RxDocument<T> & ObjectWithRxdbMetaField;

export type PatientDocument = DatabaseDocument<PatientDocType>;

export type ConsultDocument = DatabaseDocument<ConsultDocType>;

export const stripMetadata = (doc: PatientDocument | ConsultDocument) => {
  const { _meta, ...rest } = doc;
  return rest;
};
