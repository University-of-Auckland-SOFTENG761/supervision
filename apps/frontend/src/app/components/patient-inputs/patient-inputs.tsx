import React, { useEffect, useRef, useState } from 'react';
import {
  Group,
  NumberInput,
  Radio,
  Stack,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IPatient } from '@pages';
import { RecallsTable } from '../recalls-table';
import { calculateAge } from 'utils/date.utils';

type PatientInputsProps = {
  patient: IPatient;
  onUpdatePatient: (updatedPatient: IPatient) => void;
};

export const PatientInputs = ({
  patient,
  onUpdatePatient,
}: PatientInputsProps) => {
  const [patientUid, setPatientUid] = useState(patient.uid);
  const [patientAge, setPatientAge] = useState(calculateAge(patient.dob));

  const form = useForm({
    initialValues: patient,
  });

  useEffect(() => {
    if (patient.uid !== patientUid) {
      setPatientUid(patient.uid);

      form.setValues({
        uid: patient.uid,
        firstName: patient.firstName ?? '',
        lastName: patient.lastName ?? '',
        dob: patient.dob ?? '',
        patientId: patient.patientId ?? '',
        ethnicity: patient.ethnicity ?? '',
        sex: patient.sex ?? undefined,
        school: patient.school ?? '',
        year: patient.year ?? undefined,
        room: patient.room ?? '',
        address: patient.address ?? {
          street: '',
          suburb: '',
          city: '',
          postCode: '',
        },
        parentName: patient.parentName ?? '',
        phoneNumber: patient.phoneNumber ?? '',
        email: patient.email ?? '',
        notes: patient.notes ?? '',
      });
    }
  }, [form, patientUid, patient]);

  useEffect(() => {
    setPatientAge(calculateAge(form.values.dob));
  }, [form.values.dob]);

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
          <TextInput label="Date of birth:" {...form.getInputProps('dob')} />
          <NumberInput label="Age:" className="w-20" value={patientAge} />
        </Group>
        <TextInput label="Patient ID:" {...form.getInputProps('patientId')} />
        <Group className="justify-between">
          <TextInput label="Ethnicity:" {...form.getInputProps('ethnicity')} />
          <Radio.Group label="Sex:" {...form.getInputProps('sex')}>
            <Radio value="F" label="F" />
            <Radio value="M" label="M" />
          </Radio.Group>
        </Group>
        <TextInput label="School" {...form.getInputProps('school')} />
        <Group className="w-full">
          <NumberInput
            label="Year:"
            className="w-20"
            {...form.getInputProps('year')}
          />
          <TextInput
            label="Room:"
            className="grow"
            {...form.getInputProps('room')}
          />
        </Group>
      </Stack>
      <Stack>
        <TextInput
          label="Address:"
          placeholder="Street Address"
          {...form.getInputProps('address.street')}
        />
        <Group className="w-full" grow>
          <TextInput
            placeholder="Suburb"
            {...form.getInputProps('address.suburb')}
          />
          <TextInput
            placeholder="City"
            {...form.getInputProps('address.city')}
          />
        </Group>
        <TextInput
          placeholder="Postcode"
          {...form.getInputProps('address.postCode')}
        />
        <TextInput
          label="Parent Full Name:"
          {...form.getInputProps('parentName')}
        />
        <TextInput label="Phone:" {...form.getInputProps('phoneNumber')} />
        <TextInput label="Email:" {...form.getInputProps('email')} />
      </Stack>
      <Stack>
        <Textarea
          label="Admin Notes"
          placeholder="Type here..."
          autosize
          minRows={3}
          {...form.getInputProps('notes')}
        />
        <RecallsTable />
      </Stack>
    </>
  );
};

export default PatientInputs;
