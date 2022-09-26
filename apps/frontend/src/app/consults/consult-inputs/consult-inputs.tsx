import { useEffect, useRef } from 'react';
import { useForm } from '@mantine/form';
import { Stack } from '@mantine/core';
import { ConsultDetailsUpper } from '../consult-details-upper';
import { ConsultDetailsLower } from '../consult-details-lower';
import {
  buildFormValues,
  ConsultDocument,
  stripUnusedFields,
} from 'database/rxdb-utils';
import { useDatabase } from '@shared';
import { useSearchParams } from 'react-router-dom';
import { ConsultDocType, consultSchemaTyped } from 'database';

type TimestampFilter =
  | 'eyePressureTimestamp'
  | 'cyclopentolateTimestamp'
  | 'tropicamideTimestamp';

type FormTimestamps = {
  [key in TimestampFilter]: Date | null;
};

export type FormInputType = Omit<ConsultDocType, TimestampFilter> &
  FormTimestamps;

export const ConsultInputs = () => {
  const { consults, updateConsult } = useDatabase();

  const [searchParams] = useSearchParams();
  const consultId = searchParams.get('consultId');

  const consult = consultId
    ? consults?.find((p) => p.id === consultId)
    : undefined;

  const form = useForm({
    initialValues: {
      ...buildFormValues(
        consultSchemaTyped,
        consult?.toJSON !== undefined ? consult.toJSON() : consult
      ),
      eyePressureTimestamp: consult?.eyePressureTimestamp
        ? new Date(consult?.eyePressureTimestamp)
        : null,
      cyclopentolateTimestamp: consult?.cyclopentolateTimestamp
        ? new Date(consult?.cyclopentolateTimestamp)
        : null,
      tropicamideTimestamp: consult?.tropicamideTimestamp
        ? new Date(consult?.tropicamideTimestamp)
        : null,
    } as FormInputType,
  });

  useEffect(() => {
    form.setValues({
      ...buildFormValues(
        consultSchemaTyped,
        consult?.toJSON !== undefined ? consult.toJSON() : consult
      ),
      eyePressureTimestamp: consult?.eyePressureTimestamp
        ? new Date(consult?.eyePressureTimestamp)
        : null,
      cyclopentolateTimestamp: consult?.cyclopentolateTimestamp
        ? new Date(consult?.cyclopentolateTimestamp)
        : null,
      tropicamideTimestamp: consult?.tropicamideTimestamp
        ? new Date(consult?.tropicamideTimestamp)
        : null,
    } as FormInputType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [consults]);

  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const buildConsultDocument = () => {
    const strippedFormInputs = stripUnusedFields(form.values);
    const newConsult = {
      ...strippedFormInputs,
    } as ConsultDocType;
    console.log(newConsult);
    if (newConsult.id === undefined) return undefined;
    return newConsult;
  };

  useEffect(() => {
    if (debounceTimeout.current != null) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      debounceTimeout.current = null;
      const newConsult = buildConsultDocument();
      if (newConsult && updateConsult) {
        updateConsult(newConsult as ConsultDocument);
      }
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.values]);

  return (
    <Stack>
      <ConsultDetailsUpper form={form} />
      <ConsultDetailsLower form={form} />
    </Stack>
  );
};
