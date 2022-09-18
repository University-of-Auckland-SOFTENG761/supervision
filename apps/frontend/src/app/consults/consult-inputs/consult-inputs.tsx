import { IConsult } from '../consult-details-page';
import { useEffect, useRef, useState } from 'react';
import { useForm } from '@mantine/form';
import { Stack } from '@mantine/core';
import { ConsultDetailsUpper } from '../consult-details-upper';
import { ConsultDetailsLower } from '../consult-details-lower';
import { IPatient } from '@patients';

type ConsultDetailsProps = {
  consult: IConsult;
  onUpdateConsult: (updatedConsult: IConsult) => void;
};

export const ConsultInputs = ({
  consult,
  onUpdateConsult,
}: ConsultDetailsProps) => {
  const [consultUid, setConsultUid] = useState(consult.uid);

  const form = useForm({
    initialValues: {
      ...consult,
    },
  });

  useEffect(() => {
    if (consult.uid !== consultUid) {
      setConsultUid(consult.uid);
      form.setValues({
        uid: consult.uid,
      });
    }
  }, [form, consultUid, consult]);

  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceTimeout.current != null) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      debounceTimeout.current = null;
      onUpdateConsult({
        ...form.values,
      });
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.values]);

  return (
    <Stack>
      <ConsultDetailsUpper
        onUpdateConsult={onUpdateConsult}
        consult={consult}
      />
      <ConsultDetailsLower
        onUpdateConsult={onUpdateConsult}
        consult={consult}
      />
    </Stack>
  );
};
