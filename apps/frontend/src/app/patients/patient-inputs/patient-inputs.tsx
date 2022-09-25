import { useCallback, useEffect, useRef, useState } from 'react';
import { Group, NumberInput, Stack, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { RecallsTable } from '../recalls-table';
import { DatePicker } from '@mantine/dates';
import { calculateAge } from 'utils/date.utils';
import EthnicitySelect from '../ethnicity-select';
import GenderSelect from '../gender-select';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import SchoolAutocomplete from '../school-autocomplete';
import { useDatabase } from '@shared';
import { useSearchParams } from 'react-router-dom';
import { PatientDocument } from 'database/rxdb-utils';
dayjs.extend(customParseFormat);

export const PatientInputs = () => {
  const { patients, updatePatient } = useDatabase();

  const [searchParams] = useSearchParams();
  const patientId = searchParams.get('patientId');

  const patient = patientId
    ? patients?.find((p) => p.id === patientId)
    : undefined;

  const [patientAge, setPatientAge] = useState(
    patient?.dateOfBirth
      ? calculateAge(new Date(patient?.dateOfBirth))
      : undefined
  );

  const buildFormValues = useCallback(
    () => ({
      id: patient?.id ?? '',
      firstName: patient?.firstName ?? '',
      lastName: patient?.lastName ?? '',
      dateOfBirth: patient?.dateOfBirth ? new Date(patient?.dateOfBirth) : null,
      ethnicity: patient?.ethnicity ?? null,
      gender: patient?.gender ?? null,
      school: patient?.school ?? '',
      yearLevel: patient?.yearLevel,
      room: patient?.room ?? '',
      streetAddress: patient?.streetAddress ?? '',
      suburb: patient?.suburb ?? '',
      city: patient?.city ?? '',
      postcode: patient?.postcode ?? '',
      caregiverFirstName: patient?.caregiverFirstName ?? '',
      caregiverLastName: patient?.caregiverLastName ?? '',
      phoneNumber: patient?.phoneNumber ?? '',
      email: patient?.email ?? '',
      adminNotes: patient?.adminNotes ?? '',
    }),
    [patient]
  );

  const form = useForm({
    initialValues: buildFormValues(),
  });

  useEffect(() => {
    form.setValues(buildFormValues());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buildFormValues, patients]);

  useEffect(() => {
    setPatientAge(
      form.values.dateOfBirth
        ? calculateAge(new Date(form.values.dateOfBirth))
        : undefined
    );
  }, [form.values.dateOfBirth]);

  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const buildPatientDocument = () => {
    const newPatient = {
      ...form.values,
      id: patient?.id ?? '',
      gender: form.values.gender ?? undefined,
      ethnicity: form.values.ethnicity ?? undefined,
      dateOfBirth: form.values.dateOfBirth
        ? form.values.dateOfBirth.toISOString()
        : undefined,
    };
    if (newPatient.id === undefined) return undefined;
    return newPatient;
  };

  useEffect(() => {
    if (debounceTimeout.current != null) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      debounceTimeout.current = null;
      const newPatient = buildPatientDocument();
      if (newPatient && updatePatient) {
        updatePatient(newPatient as PatientDocument);
      }
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.values]);

  return (
    <>
      <Stack>
        <TextInput
          required
          label="First name:"
          {...form.getInputProps('firstName')}
        />
        <TextInput
          required
          label="Last name:"
          {...form.getInputProps('lastName')}
        />
        <Group className="justify-between">
          <DatePicker
            required
            label="Date of birth:"
            {...form.getInputProps('dateOfBirth')}
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
        <TextInput label="Patient ID:" {...form.getInputProps('id')} disabled />
        <EthnicitySelect {...form.getInputProps('ethnicity')} />
        <GenderSelect {...form.getInputProps('gender')} />
        <SchoolAutocomplete label="School" {...form.getInputProps('school')} />
        <Group className="w-full">
          <NumberInput
            label="Year:"
            className="w-20"
            {...form.getInputProps('yearLevel')}
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
          {...form.getInputProps('streetAddress')}
        />
        <Group className="w-full" grow>
          <TextInput placeholder="Suburb" {...form.getInputProps('suburb')} />
          <TextInput placeholder="City" {...form.getInputProps('city')} />
        </Group>
        <TextInput placeholder="Postcode" {...form.getInputProps('postcode')} />
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
          {...form.getInputProps('adminNotes')}
        />
        <RecallsTable />
      </Stack>
    </>
  );
};

export default PatientInputs;
