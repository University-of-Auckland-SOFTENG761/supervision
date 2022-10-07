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
  const {
    _isTemporary,
    _isDeleted$,
    _dataSync$,
    _atomicQueue,
    isInstanceOfRxDocument,
    collection,
    _meta,
    revision,
    _deleted,
    _attachments,
    _rev,
    ...rest
  } = doc;
  return rest;
};

export const buildFormValues = (
  schema: { properties: { [key: string]: { type: string } } },
  docJSON?: { [key: string]: unknown }
) =>
  Object.fromEntries(
    Object.entries(schema.properties).map(([key, { type }]) => {
      const value = docJSON?.[key];
      return [key, value === null || value === undefined ? '' : value];
    })
  );

export const stripUnusedFields = (docJSON?: { [key: string]: unknown }) =>
  Object.fromEntries(
    Object.entries(docJSON ?? {}).map(([key, value]) => {
      if (value instanceof Date) {
        return [
          key,
          !isNaN(value as unknown as number) ? value.toISOString() : null,
        ];
      }
      return [key, value ? value : null];
    })
  );

export const parseDateForInput = (date: string) => {
  return date ? new Date(date) : undefined;
};

export const parseNumberForInput = (number: number | string) => {
  return number ? Number(number) : undefined;
};
