import { useEffect, useRef } from 'react';
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
  const [debouncedRevision, cancelDebounce] = useDebouncedValue(
    consult?.revision,
    100
  );
  consultRef.current = consult.toMutableJSON();

  const sendUpdate = () => {
    if (consultRef.current) {
      console.log(consultRef.current);
      updateConsult(stripUnusedFields(consultRef.current) as ConsultDocType);
    }
  };

  const timeoutRef = useRef<NodeJS.Timer | null>(null);

  const cancelRender = () => {
    cancelDebounce();
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(sendUpdate, 5000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        sendUpdate();
      }
    };
  }, []);

  const setFieldByKey = (key: string, value: string | number | null) => {
    console.log('setFieldByKey', key, value);
    if (consultRef.current) {
      const newConsult = Object.fromEntries([
        ...Object.entries(consultRef.current),
        [key, value],
      ]) as ConsultDocType;
      updateConsult(newConsult);
    }
  };

  const setFieldsByKeys = (
    keyValuePairs: [key: string, value: string | number | null][]
  ) => {
    console.log('setFieldsByKeys', keyValuePairs);
    if (consultRef.current) {
      const newConsult = Object.fromEntries([
        ...Object.entries(consultRef.current),
        ...keyValuePairs,
      ]) as ConsultDocType;
      updateConsult(newConsult);
    }
  };

  return (
    <Stack onChange={cancelRender} key={debouncedRevision}>
      <ConsultDetailsUpper consultRef={consultRef} />
      <ConsultDetailsLower
        consult={consult}
        setFieldByKey={setFieldByKey}
        setFieldsByKeys={setFieldsByKeys}
      />
    </Stack>
  );
};
