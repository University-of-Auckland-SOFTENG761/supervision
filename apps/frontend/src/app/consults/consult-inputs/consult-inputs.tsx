import { useEffect, useRef } from 'react';
import { Stack } from '@mantine/core';
import { ConsultDetailsUpper } from '../consult-details-upper';
import { ConsultDetailsLower } from '../consult-details-lower';
import { stripUnusedFields } from 'database/rxdb-utils';
import { ConsultDocType } from 'database';
import { RxDocument } from 'rxdb';
import { useForm } from 'react-hook-form';

type ConsultInputsProps = {
  consult: RxDocument<ConsultDocType>;
  updateConsult: (consultJSON: ConsultDocType) => void;
};

export const ConsultInputs = ({
  consult,
  updateConsult,
}: ConsultInputsProps) => {
  const { register, getValues, setValue } = useForm();

  const timeoutRef = useRef<NodeJS.Timer | null>(null);

  const handleUpdateConsult = () => {
    const newConsult = {
      ...stripUnusedFields(getValues('consult')),
      id: consult.get('id'),
    } as ConsultDocType;
    updateConsult(newConsult);
  };

  const handleChange = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      handleUpdateConsult();
      timeoutRef.current = null;
    }, 1000);
  };

  const setAndHandleChange = (
    name: string,
    value: unknown,
    urgent?: boolean
  ) => {
    setValue(name, value);
    if (urgent) {
      timeoutRef.current && clearTimeout(timeoutRef.current);
      handleUpdateConsult();
    } else {
      handleChange();
    }
  };

  useEffect(() => {
    if (!timeoutRef.current) {
      setValue('consult', consult.toJSON());
    }
  }, [consult, consult.revision, setValue]);

  return (
    <Stack onChange={handleChange}>
      <ConsultDetailsUpper
        consult={consult}
        register={register}
        setValue={setAndHandleChange}
      />
      <ConsultDetailsLower
        consult={consult}
        register={register}
        getValues={getValues}
        setValue={setAndHandleChange}
      />
    </Stack>
  );
};
