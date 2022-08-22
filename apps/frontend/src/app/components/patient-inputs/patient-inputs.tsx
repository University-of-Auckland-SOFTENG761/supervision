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
import { DatePicker } from '@mantine/dates';
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
  const [patientAge, setPatientAge] = useState(
    patient.dob ? calculateAge(new Date(patient.dob)) : undefined
  );

  const form = useForm({
    initialValues: {
      ...patient,
      dob: patient.dob !== undefined ? new Date(patient.dob) : null,
    },
  });

  console.log(form.values.dob);

  useEffect(() => {
    if (patient.uid !== patientUid) {
      setPatientUid(patient.uid);
      form.setValues({
        uid: patient.uid,
        firstName: patient.firstName ?? '',
        lastName: patient.lastName ?? '',
        dob: patient.dob ? new Date(patient.dob) : null,
        patientId: patient.patientId ?? '',
        ethnicity: patient.ethnicity ?? '',
        sex: patient.sex,
        school: patient.school ?? '',
        year: patient.year,
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
    setPatientAge(
      form.values.dob ? calculateAge(new Date(form.values.dob)) : undefined
    );
  }, [form.values.dob]);

  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceTimeout.current != null) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      debounceTimeout.current = null;
      onUpdatePatient({
        ...form.values,
        dob: form.values.dob ? form.values.dob.toISOString() : undefined,
      });
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.values]);

  return (
    <>
      <Stack>
        <TextInput label="First name:" {...form.getInputProps('firstName')} />
        <TextInput label="Last name:" {...form.getInputProps('lastName')} />
        <Group className="justify-between">
          <DatePicker
            label="Date of birth:"
            {...form.getInputProps('dob')}
            allowFreeInput
            inputFormat="DD/MM/YYYY"
            placeholder="DD/MM/YYYY"
          />
          <NumberInput
            label="Age:"
            className="w-20"
            value={patientAge}
            disabled
          />
        </Group>
        <TextInput
          label="Patient ID:"
          {...form.getInputProps('patientId')}
          disabled
        />
        <Group className="justify-between">
          <TextInput label="Ethnicity:" {...form.getInputProps('ethnicity')} />
          <Radio.Group
            label="Sex:"
            {...form.getInputProps('sex', { type: 'checkbox' })}
          >
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
