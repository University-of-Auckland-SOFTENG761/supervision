import React, { useEffect, useRef, useState } from 'react';
import { Group, NumberInput, Radio, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IPatient } from '@pages';

type PatientInputsProps = {
  patient: IPatient;
  onUpdatePatient: (updatedPatient: IPatient) => void;
};

export const PatientInputs = ({
  patient,
  onUpdatePatient,
}: PatientInputsProps) => {
  const [patientUid, setPatientUid] = useState(patient.uid);

  const form = useForm({
    initialValues: patient,
  });

  useEffect(() => {
    if (patient.uid !== patientUid) {
      setPatientUid(patient.uid);
      form.setValues(patient);
    }
  }, [form, patientUid, patient]);

  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceTimeout.current != null) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      debounceTimeout.current = null;
      onUpdatePatient(form.values);
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.values]);

  return (
    <>
      <Stack>
        <TextInput label="First name:" {...form.getInputProps('firstName')} />
        <TextInput label="Last name:" {...form.getInputProps('lastName')} />
        <Group className="justify-between">
          <TextInput label="Date of birth:" />
          <NumberInput label="Age:" className="w-20" />
        </Group>
        <TextInput label="Patient ID:" {...form.getInputProps('patientId')} />
        <Group className="justify-between">
          <TextInput label="Ethnicity:" />
          <Radio.Group label="Sex:">
            <Radio value="F" label="F" />
            <Radio value="M" label="M" />
          </Radio.Group>
        </Group>
        <TextInput label="School" />
        <Group className="w-full">
          <NumberInput label="Year:" className="w-20" />
          <TextInput label="Room:" className="grow" />
        </Group>
      </Stack>
      <Stack>
        <TextInput label="Address:" placeholder="Street Address" />
        <Group className="w-full" grow>
          <TextInput placeholder="Suburb" />
          <TextInput placeholder="City" />
        </Group>
        <TextInput placeholder="Postcode" />
        <TextInput label="Parent Full Name:" />
        <TextInput label="Phone:" />
        <TextInput label="Email:" />
      </Stack>
    </>
  );
};

export default PatientInputs;
