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
    ...rest
  } = doc;
  return rest;
};

export const buildFormValues = (
  docJSON?: { [key: string]: unknown },
  dateKeys?: string[],
  enumKeys?: string[]
) =>
  Object.fromEntries(
    Object.entries(docJSON ?? {}).map(([key, value]) => {
      if (dateKeys?.includes(key)) {
        return [key, value ? new Date(value as string) : null];
      }
      if (enumKeys?.includes(key)) {
        return [key, value ?? null];
      }
      return [key, value ?? ''];
    })
  );

export const stripUnusedFields = (docJSON?: { [key: string]: unknown }) =>
  Object.fromEntries(
    Object.entries(docJSON ?? {}).filter(
      ([key, value]) =>
        !(
          value === '' ||
          value == null ||
          (value as Array<unknown>).length === 0
        )
    )
  );
