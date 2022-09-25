import { useEffect, useRef, useState } from 'react';
import { useForm } from '@mantine/form';
import { Stack } from '@mantine/core';
import { ConsultDetailsUpper } from '../consult-details-upper';
import { ConsultDetailsLower } from '../consult-details-lower';
import { ConsultDocument } from 'database/rxdb-utils';

type ConsultDetailsProps = {
  consult: ConsultDocument;
  onUpdateConsult: (updatedConsult: ConsultDocument) => void;
};

export const ConsultInputs = ({
  consult,
  onUpdateConsult,
}: ConsultDetailsProps) => {
  const [consultId, setConsultId] = useState(consult.id);

  const form = useForm({
    initialValues: {
      ...consult,
    },
  });

  useEffect(() => {
    if (consult.id !== consultId) {
      setConsultId(consult.id);
      form.setValues(consult);
    }
  }, [form, consultId, consult]);

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
