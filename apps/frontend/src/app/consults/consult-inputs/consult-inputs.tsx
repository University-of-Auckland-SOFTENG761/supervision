import { useRef } from 'react';
import { Stack } from '@mantine/core';
import { ConsultDetailsUpper } from '../consult-details-upper';
import { ConsultDetailsLower } from '../consult-details-lower';
import { stripUnusedFields } from 'database/rxdb-utils';
import { ConsultDocType } from 'database';
import { useDebouncedValue } from '@mantine/hooks';
import { RxDocument } from 'rxdb';

type ConsultInputsProps = {
  consult: RxDocument<ConsultDocType>;
  updateConsult: (consultJSON: ConsultDocType) => void;
};

export const ConsultInputs = ({
  consult,
  updateConsult,
}: ConsultInputsProps) => {
  const consultRef = useRef<ConsultDocType | null>(consult);
  const [debouncedRevision] = useDebouncedValue(consult?.revision, 5000);

  consultRef.current = consult.toMutableJSON();
  console.log(debouncedRevision);

  const sendUpdate = () => {
    if (consultRef.current) {
      console.log(consultRef.current);
      updateConsult(stripUnusedFields(consultRef.current));
    }
  };

  const setFieldByKey = (key: string, value: string | number | undefined) => {
    if (consultRef.current) {
      const newConsult = Object.fromEntries([
        ...Object.entries(consultRef.current),
        [key, value],
      ]) as ConsultDocType;
      updateConsult(newConsult);
    }
  };

  return (
    <Stack onBlur={sendUpdate} key={debouncedRevision}>
      <div>
        <ConsultDetailsUpper consultRef={consultRef} />
      </div>
      <div>
        <ConsultDetailsLower consult={consult} setFieldByKey={setFieldByKey} />
      </div>
    </Stack>
  );
};
