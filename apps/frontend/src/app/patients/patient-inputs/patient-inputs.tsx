import React, { useEffect, useRef, useState } from 'react';
import { Group, NumberInput, Stack, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { RecallsTable } from '../recalls-table';
import { DatePicker } from '@mantine/dates';
import { calculateAge } from 'utils/date.utils';
import { IPatient } from '../patient-details-page';
import EthnicitySelect from '../ethnicity-select';
import GenderSelect from '../gender-select';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import SchoolAutocomplete from '../school-autocomplete';
dayjs.extend(customParseFormat);

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
      gender: patient.gender ?? null,
      ethnicity: patient.ethnicity ?? null,
      dob: patient.dob !== undefined ? new Date(patient.dob) : null,
    },
  });

  useEffect(() => {
    if (patient.uid !== patientUid) {
      setPatientUid(patient.uid);
      form.setValues({
        uid: patient.uid,
        firstName: patient.firstName ?? '',
        lastName: patient.lastName ?? '',
        dob: patient.dob ? new Date(patient.dob) : null,
        patientId: patient.patientId ?? '',
        ethnicity: patient.ethnicity ?? null,
        gender: patient.gender ?? null,
        school: patient.school ?? '',
        year: patient.year,
        room: patient.room ?? '',
        address: patient.address ?? {
          street: '',
          suburb: '',
          city: '',
          postCode: '',
        },
        caregiverFirstName: patient.caregiverFirstName ?? '',
        caregiverLastName: patient.caregiverLastName ?? '',
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
        gender: form.values.gender ?? undefined,
        ethnicity: form.values.ethnicity ?? undefined,
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
            dateParser={(date: string) =>
              dayjs(date, ['DD/MM/YYYY', 'DD/MM/YY']).toDate()
            }
            placeholder="DD/MM/YYYY"
            initialMonth={new Date('2009-01-01')}
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
        <EthnicitySelect {...form.getInputProps('ethnicity')} />
        <GenderSelect {...form.getInputProps('gender')} />
        <SchoolAutocomplete label="School" {...form.getInputProps('school')} />
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
          label="Caregiver First Name:"
          {...form.getInputProps('caregiverFirstName')}
        />
        <TextInput
          label="Caregiver Last Name:"
          {...form.getInputProps('caregiverLastName')}
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
