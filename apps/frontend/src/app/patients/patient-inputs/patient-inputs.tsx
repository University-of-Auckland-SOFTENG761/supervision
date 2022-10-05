import { useEffect, useRef } from 'react';
import {
  Center,
  Group,
  Loader,
  NumberInput,
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
import { useDatabase } from '@shared';
import { ConsultDocument, buildFormValues } from 'database/rxdb-utils';
import { PatientDocType, patientSchemaTyped } from 'database';
dayjs.extend(customParseFormat);

type PatientInputsProps = {
  patientConsults: ConsultDocument[];
  patientId: string;
};

export type FormInputType = Omit<PatientDocType, 'dateOfBirth'> & {
  dateOfBirth: Date | null;
};

export const PatientInputs = ({
  patientConsults,
  patientId,
}: PatientInputsProps) => {
  const { patientsCollection } = useDatabase();

  const patientRef = useRef<PatientDocType | null>(null);

  useEffect(() => {
    console.log('patients collection or id changed');
    if (patientsCollection && patientId) {
      patientsCollection
        .findOne({ selector: { id: patientId } })
        .exec()
        .then((p) => {
          p &&
            (patientRef.current = buildFormValues(
              patientSchemaTyped,
              p as PatientDocType
            ) as PatientDocType);
        });
    }
  }, [patientsCollection, patientId]);

  const patientAge =
    patientRef.current?.dateOfBirth &&
    calculateAge(new Date(patientRef.current?.dateOfBirth));

  const sendUpdate = () => {
    if (patientRef?.current) {
      console.log(patientRef.current);
      patientsCollection?.upsert(patientRef.current);
    }
  };

  if (!patientRef.current)
    // This is currently ugly but it prevents inputs from being loaded with incorrect defaultValues
    return (
      <Center className="w-full h-full">
        <Loader />
      </Center>
    );

  return (
    <>
      <Stack onBlur={sendUpdate}>
        <TextInput
          required
          label="First name:"
          defaultValue={patientRef.current?.firstName}
          onChange={(e) =>
            patientRef?.current &&
            (patientRef.current = {
              ...patientRef.current,
              firstName: e.currentTarget.value,
            })
          }
        />
        <TextInput
          required
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
            defaultValue={new Date(patientRef.current?.dateOfBirth ?? '')}
            onChange={(d) => {
              patientRef?.current &&
                (patientRef.current = {
                  ...patientRef.current,
                  dateOfBirth: d?.toISOString(),
                });
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
            defaultValue={Number(patientAge)}
            disabled
          />
        </Group>
        <TextInput
          label="Patient ID:"
          value={patientRef.current?.id}
          disabled
        />
        <EthnicitySelect
          defaultValue={patientRef.current?.ethnicity ?? null}
          onChange={(s) =>
            patientRef.current &&
            (patientRef.current.ethnicity = s ?? undefined)
          }
        />
        <GenderSelect
          defaultValue={patientRef.current?.gender ?? null}
          onChange={(s) =>
            patientRef.current && (patientRef.current.gender = s ?? undefined)
          }
        />
        <SchoolAutocomplete
          defaultValue={patientRef.current?.school}
          onChange={(s) =>
            patientRef.current && (patientRef.current.school = s ?? undefined)
          }
        />
        <Group className="w-full">
          <NumberInput
            label="Year:"
            className="w-20"
            defaultValue={Number(patientRef.current?.yearLevel)}
            onChange={(n) =>
              patientRef.current &&
              (patientRef.current.yearLevel = n ?? undefined)
            }
          />
          <TextInput
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
          placeholder="Postcode"
          defaultValue={patientRef.current?.postcode}
          onChange={(e) =>
            patientRef.current &&
            (patientRef.current.postcode = e.currentTarget.value)
          }
        />
        <TextInput
          label="Caregiver First Name:"
          defaultValue={patientRef.current?.caregiverFirstName}
          onChange={(e) =>
            patientRef.current &&
            (patientRef.current.caregiverFirstName = e.currentTarget.value)
          }
        />
        <TextInput
          label="Caregiver Last Name:"
          defaultValue={patientRef.current?.caregiverLastName}
          onChange={(e) =>
            patientRef.current &&
            (patientRef.current.caregiverLastName = e.currentTarget.value)
          }
        />
        <TextInput
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
        <RecallsTable patientConsults={patientConsults} />
      </Stack>
    </>
  );
};

export default PatientInputs;
