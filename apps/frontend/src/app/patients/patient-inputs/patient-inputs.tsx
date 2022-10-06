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
import { stripUnusedFields } from 'database/rxdb-utils';
import { ConsultDocType, PatientDocType } from 'database';
import { RxDocument } from 'rxdb';
import { useDebouncedValue } from '@mantine/hooks';
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
  const patientRef = useRef<PatientDocType | null>(patient);
  const [debouncedRevision, cancelDebounce] = useDebouncedValue(
    patient?.revision,
    5000
  );

  patientRef.current = patient.toMutableJSON();

  const patientAge =
    patientRef.current?.dateOfBirth &&
    calculateAge(new Date(patientRef.current?.dateOfBirth));

  const sendUpdate = () => {
    if (patientRef.current) {
      updatePatient(stripUnusedFields(patientRef.current));
    }
  };

  const timeoutRef = useRef<NodeJS.Timer | null>(null);

  const cancelRender = () => {
    cancelDebounce();
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(sendUpdate, 5000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      sendUpdate();
    };
  }, []);

  return (
    <SimpleGrid
      onChange={cancelRender}
      cols={3}
      spacing={180}
      breakpoints={[
        { maxWidth: 1024, cols: 2, spacing: 100 },
        { maxWidth: 1280, cols: 3, spacing: 100 },
      ]}
      key={debouncedRevision}
    >
      <Stack>
        <TextInput
          required
          maxLength={40}
          label="First name:"
          defaultValue={patientRef.current?.firstName}
          onChange={(e) =>
            patientRef.current &&
            (patientRef.current.firstName = e.currentTarget.value)
          }
        />
        <TextInput
          required
          maxLength={40}
          label="Last name:"
          defaultValue={patientRef.current?.lastName}
          onChange={(e) =>
            patientRef.current &&
            (patientRef.current.lastName = e.currentTarget.value)
          }
        />
        <Group className="justify-between">
          <DatePicker
            required
            label="Date of birth:"
            defaultValue={
              patientRef.current?.dateOfBirth
                ? new Date(patientRef.current?.dateOfBirth)
                : undefined
            }
            onChange={(d) => {
              patientRef.current &&
                (patientRef.current.dateOfBirth = d?.toISOString());
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
        <TextInput
          label="Patient ID:"
          value={patientRef.current?.id}
          disabled
        />
        <EthnicitySelect
          defaultValue={patientRef.current?.ethnicity}
          onChange={(s) =>
            patientRef.current &&
            (patientRef.current.ethnicity = s ?? undefined)
          }
        />
        <GenderSelect
          defaultValue={patientRef.current?.gender}
          onChange={(s) =>
            patientRef.current && (patientRef.current.gender = s ?? undefined)
          }
        />
        <SchoolAutocomplete
          defaultValue={patientRef.current?.school ?? undefined}
          onChange={(s) =>
            patientRef.current && (patientRef.current.school = s ?? undefined)
          }
        />
        <Group className="w-full">
          <NumberInput
            label="Year:"
            className="w-20"
            defaultValue={
              patientRef.current?.yearLevel
                ? Number(patientRef.current?.yearLevel)
                : undefined
            }
            onChange={(n) =>
              patientRef.current &&
              (patientRef.current.yearLevel = n ?? undefined)
            }
          />
          <TextInput
            maxLength={20}
            label="Room:"
            className="grow"
            defaultValue={patientRef.current?.room}
            onChange={(e) =>
              patientRef.current &&
              (patientRef.current.room = e.currentTarget.value)
            }
          />
        </Group>
      </Stack>
      <Stack>
        <TextInput
          label="Address:"
          placeholder="Street Address"
          defaultValue={patientRef.current?.streetAddress}
          onChange={(e) =>
            patientRef.current &&
            (patientRef.current.streetAddress = e.currentTarget.value)
          }
        />
        <Group className="w-full" grow>
          <TextInput
            placeholder="Suburb"
            defaultValue={patientRef.current?.suburb}
            onChange={(e) =>
              patientRef.current &&
              (patientRef.current.suburb = e.currentTarget.value)
            }
          />
          <TextInput
            placeholder="City"
            defaultValue={patientRef.current?.city}
            onChange={(e) =>
              patientRef.current &&
              (patientRef.current.city = e.currentTarget.value)
            }
          />
        </Group>
        <TextInput
          maxLength={5}
          placeholder="Postcode"
          defaultValue={patientRef.current?.postcode}
          onChange={(e) =>
            patientRef.current &&
            (patientRef.current.postcode = e.currentTarget.value)
          }
        />
        <TextInput
          maxLength={40}
          label="Caregiver First Name:"
          defaultValue={patientRef.current?.caregiverFirstName}
          onChange={(e) =>
            patientRef.current &&
            (patientRef.current.caregiverFirstName = e.currentTarget.value)
          }
        />
        <TextInput
          maxLength={40}
          label="Caregiver Last Name:"
          defaultValue={patientRef.current?.caregiverLastName}
          onChange={(e) =>
            patientRef.current &&
            (patientRef.current.caregiverLastName = e.currentTarget.value)
          }
        />
        <TextInput
          maxLength={15}
          label="Phone:"
          defaultValue={patientRef.current?.phoneNumber}
          onChange={(e) =>
            patientRef.current &&
            (patientRef.current.phoneNumber = e.currentTarget.value)
          }
        />
        <TextInput
          label="Email:"
          defaultValue={patientRef.current?.email}
          onChange={(e) =>
            patientRef.current &&
            (patientRef.current.email = e.currentTarget.value)
          }
        />
      </Stack>
      <Stack>
        <Textarea
          label="Admin Notes"
          placeholder="Type here..."
          autosize
          minRows={3}
          defaultValue={patientRef.current?.adminNotes}
          onChange={(e) =>
            patientRef.current &&
            (patientRef.current.adminNotes = e.currentTarget.value)
          }
        />
        <RecallsTable consults={consults} />
      </Stack>
    </SimpleGrid>
  );
};

export default PatientInputs;
