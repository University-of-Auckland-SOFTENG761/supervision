import { useEffect, useState } from 'react';
import { Group, NumberInput, Stack, Textarea, TextInput } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
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
  }, [patient]);

  useEffect(() => {
    setPatientAge(
      form.values.dateOfBirth
        ? calculateAge(new Date(form.values.dateOfBirth))
        : undefined
    );
  }, [form.values.dateOfBirth]);

  const sendUpdate = () => {
    if (updatePatient && form.values)
      updatePatient(stripUnusedFields(form.values));
  };

  const [debouncedFormValues] = useDebouncedValue(form.values, 5000);

  useEffect(() => {
    sendUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedFormValues]);

  return (
    <>
      <Stack onBlur={sendUpdate}>
        <TextInput
          required
          label="First name:"
          onBlur={sendUpdate}
          {...form.getInputProps('firstName')}
        />
        <TextInput
          required
          label="Last name:"
          onBlur={sendUpdate}
          {...form.getInputProps('lastName')}
        />
        <Group className="justify-between">
          <DatePicker
            required
            label="Date of birth:"
            onBlur={sendUpdate}
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
        <TextInput
          label="Patient ID:"
          onBlur={sendUpdate}
          {...form.getInputProps('id')}
          disabled
        />
        <EthnicitySelect
          onBlur={sendUpdate}
          {...form.getInputProps('ethnicity')}
        />
        <GenderSelect onBlur={sendUpdate} {...form.getInputProps('gender')} />
        <SchoolAutocomplete
          label="School"
          onBlur={sendUpdate}
          {...form.getInputProps('school')}
        />
        <Group className="w-full">
          <NumberInput
            label="Year:"
            className="w-20"
            onBlur={sendUpdate}
            {...form.getInputProps('yearLevel')}
          />
          <TextInput
            label="Room:"
            className="grow"
            onBlur={sendUpdate}
            {...form.getInputProps('room')}
          />
        </Group>
      </Stack>
      <Stack>
        <TextInput
          label="Address:"
          placeholder="Street Address"
          onBlur={sendUpdate}
          {...form.getInputProps('streetAddress')}
        />
        <Group className="w-full" grow>
          <TextInput
            placeholder="Suburb"
            onBlur={sendUpdate}
            {...form.getInputProps('suburb')}
          />
          <TextInput
            placeholder="City"
            onBlur={sendUpdate}
            {...form.getInputProps('city')}
          />
        </Group>
        <TextInput
          placeholder="Postcode"
          onBlur={sendUpdate}
          {...form.getInputProps('postcode')}
        />
        <TextInput
          label="Caregiver First Name:"
          onBlur={sendUpdate}
          {...form.getInputProps('caregiverFirstName')}
        />
        <TextInput
          label="Caregiver Last Name:"
          onBlur={sendUpdate}
          {...form.getInputProps('caregiverLastName')}
        />
        <TextInput
          label="Phone:"
          onBlur={sendUpdate}
          {...form.getInputProps('phoneNumber')}
        />
        <TextInput
          label="Email:"
          onBlur={sendUpdate}
          {...form.getInputProps('email')}
        />
      </Stack>
      <Stack>
        <Textarea
          label="Admin Notes"
          placeholder="Type here..."
          autosize
          minRows={3}
          onBlur={sendUpdate}
          {...form.getInputProps('adminNotes')}
        />
        <RecallsTable patientConsults={patientConsults} />
      </Stack>
    </>
  );
};

export default PatientInputs;
