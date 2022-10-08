import { useEffect, useRef } from 'react';
import {
  Group,
  NumberInput,
  SimpleGrid,
  Stack,
  Textarea,
  TextInput,
} from '@mantine/core';
import { RecallsTable } from '../recalls-table';
import { DatePicker } from '@mantine/dates';
import { calculateAge } from 'utils/date.utils';
import EthnicitySelect from '../ethnicity-select';
import GenderSelect from '../gender-select';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import SchoolAutocomplete from '../school-autocomplete';
import {
  parseDateForInput,
  parseNumberForInput,
  stripUnusedFields,
} from 'database/rxdb-utils';
import { ConsultDocType, PatientDocType } from 'database';
import { RxDocument } from 'rxdb';
import { useForm } from 'react-hook-form';
dayjs.extend(customParseFormat);

type PatientInputsProps = {
  patient: RxDocument<PatientDocType>;
  updatePatient: (patientJSON: PatientDocType) => void;
  consults: Map<string, RxDocument<ConsultDocType>> | null;
};

export type FormInputType = Omit<PatientDocType, 'dateOfBirth'> & {
  dateOfBirth: Date | null;
};

export const PatientInputs = ({
  patient,
  updatePatient,
  consults,
}: PatientInputsProps) => {
  const { register, getValues, setValue } = useForm();

  const patientAge =
    patient.get('dateOfBirth') &&
    calculateAge(new Date(patient.get('dateOfBirth')));

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleChange = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      const newPatient = {
        ...stripUnusedFields(JSON.parse(JSON.stringify(getValues('patient')))),
        id: patient.get('id'),
      } as PatientDocType;
      updatePatient(newPatient);
    }, 1000);
  };

  useEffect(() => {
    if (!timeoutRef.current) {
      setValue('patient', patient.toMutableJSON());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patient.revision]);

  return (
    <SimpleGrid
      cols={3}
      spacing={180}
      breakpoints={[
        { maxWidth: 1024, cols: 2, spacing: 100 },
        { maxWidth: 1280, cols: 3, spacing: 100 },
      ]}
      onChange={handleChange}
    >
      <Stack>
        <TextInput
          required
          label="First name:"
          defaultValue={patient.get('firstName')}
          {...register('patient.firstName')}
          maxLength={40}
        />
        <TextInput
          required
          label="Last name:"
          defaultValue={patient.get('lastName')}
          {...register('patient.lastName')}
          maxLength={40}
        />
        <Group className="justify-between">
          <DatePicker
            required
            label="Date of birth:"
            defaultValue={parseDateForInput(patient.get('dateOfBirth'))}
            {...register('patient.dateOfBirth', {
              valueAsDate: true,
            })}
            onChange={(e) => {
              setValue('patient.dateOfBirth', e ?? undefined);
              handleChange();
            }}
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
            defaultValue={patientAge ? Number(patientAge) : undefined}
            disabled
          />
        </Group>
        <TextInput label="Patient ID:" value={patient.get('id')} disabled />
        <EthnicitySelect
          defaultValue={patient.get('ethnicity')}
          {...register('patient.ethnicity')}
          onChange={(e) => {
            setValue('patient.ethnicity', e ?? undefined);
            handleChange();
          }}
        />
        <GenderSelect
          defaultValue={patient.get('gender')}
          {...register('patient.gender')}
          onChange={(e) => {
            setValue('patient.gender', e ?? undefined);
            handleChange();
          }}
        />
        <SchoolAutocomplete
          defaultValue={patient.get('school')}
          {...register('patient.school')}
          onChange={(e) => {
            setValue('patient.school', e ?? undefined);
            handleChange();
          }}
        />
        <Group className="w-full">
          <NumberInput
            label="Year:"
            className="w-20"
            defaultValue={parseNumberForInput(patient.get('yearLevel'))}
            {...register('patient.yearLevel', {
              valueAsNumber: true,
            })}
            max={13}
            min={0}
            onChange={(e) => {
              setValue('patient.yearLevel', e ?? undefined);
              handleChange();
            }}
          />
          <TextInput
            maxLength={20}
            label="Room:"
            className="grow"
            defaultValue={patient.get('room')}
            {...register('patient.room')}
          />
        </Group>
      </Stack>
      <Stack>
        <TextInput
          label="Address:"
          placeholder="Street Address"
          defaultValue={patient.get('streetAddress')}
          {...register('patient.streetAddress')}
        />
        <Group className="w-full" grow>
          <TextInput
            placeholder="Suburb"
            defaultValue={patient.get('suburb')}
            {...register('patient.suburb')}
          />
          <TextInput
            placeholder="City"
            defaultValue={patient.get('city')}
            {...register('patient.city')}
          />
        </Group>
        <TextInput
          placeholder="Postcode"
          defaultValue={patient.get('postcode')}
          {...register('patient.postcode')}
          maxLength={5}
        />
        <TextInput
          label="Caregiver First Name:"
          defaultValue={patient.get('caregiverFirstName')}
          {...register('patient.caregiverFirstName')}
          maxLength={40}
        />
        <TextInput
          label="Caregiver Last Name:"
          defaultValue={patient.get('caregiverLastName')}
          {...register('patient.caregiverLastName')}
          maxLength={40}
        />
        <TextInput
          label="Phone:"
          defaultValue={patient.get('phoneNumber')}
          {...register('patient.phoneNumber')}
          maxLength={15}
        />
        <TextInput
          label="Email:"
          defaultValue={patient.get('email')}
          {...register('patient.email')}
        />
      </Stack>
      <Stack>
        <Textarea
          label="Admin Notes"
          placeholder="Type here..."
          autosize
          defaultValue={patient.get('adminNotes')}
          {...register('patient.adminNotes')}
          minRows={3}
        />
        <RecallsTable consults={consults} />
      </Stack>
    </SimpleGrid>
  );
};

export default PatientInputs;
