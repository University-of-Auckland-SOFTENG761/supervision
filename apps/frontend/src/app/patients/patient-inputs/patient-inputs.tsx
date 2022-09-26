import { useEffect, useRef, useState } from 'react';
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
import {
  ConsultDocument,
  PatientDocument,
  buildFormValues,
  stripUnusedFields,
} from 'database/rxdb-utils';
import { PatientDocType, patientSchemaTyped } from 'database';
dayjs.extend(customParseFormat);

type PatientInputsProps = {
  patientConsults: ConsultDocument[];
};

export type FormInputType = Omit<PatientDocType, 'dateOfBirth'> & {
  dateOfBirth: Date | null;
};

export const PatientInputs = ({ patientConsults }: PatientInputsProps) => {
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

  const form = useForm({
    initialValues: {
      ...buildFormValues(
        patientSchemaTyped,
        patient?.toJSON !== undefined ? patient.toJSON() : patient
      ),
      dateOfBirth: patient?.dateOfBirth ? new Date(patient?.dateOfBirth) : null,
    } as FormInputType,
  });

  useEffect(() => {
    form.setValues({
      ...buildFormValues(
        patientSchemaTyped,
        patient?.toJSON !== undefined ? patient.toJSON() : patient
      ),
      dateOfBirth: patient?.dateOfBirth ? new Date(patient?.dateOfBirth) : null,
    } as FormInputType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patients]);

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
      ...stripUnusedFields(form.values),
      dateOfBirth: form.values.dateOfBirth?.toISOString
        ? new Date(form.values.dateOfBirth).toISOString()
        : undefined,
    } as PatientDocType;
    if (newPatient.id === undefined) return undefined;
    console.log(newPatient);
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
        <RecallsTable patientConsults={patientConsults} />
      </Stack>
    </>
  );
};

export default PatientInputs;
