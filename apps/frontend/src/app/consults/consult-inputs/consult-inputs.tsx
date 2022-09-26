import { useEffect } from 'react';
import { useForm } from '@mantine/form';
import { Stack } from '@mantine/core';
import { ConsultDetailsUpper } from '../consult-details-upper';
import { ConsultDetailsLower } from '../consult-details-lower';
import { buildFormValues, stripUnusedFields } from 'database/rxdb-utils';
import { useDatabase } from '@shared';
import { useSearchParams } from 'react-router-dom';
import { ConsultDocType, consultSchemaTyped } from 'database';
import { useDebouncedValue } from '@mantine/hooks';

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

  const [debouncedFormValues] = useDebouncedValue(form.values, 5000);

  useEffect(() => {
    if (debouncedFormValues && updateConsult) {
      updateConsult(stripUnusedFields(debouncedFormValues));
    }
    return () => {
      if (updateConsult) updateConsult(stripUnusedFields(form.values));
    };
  }, [debouncedFormValues, form.values, updateConsult]);

  return (
    <Stack>
      <ConsultDetailsUpper form={form} />
      <ConsultDetailsLower form={form} />
    </Stack>
  );
};
