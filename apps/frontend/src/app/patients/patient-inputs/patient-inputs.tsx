import { useEffect, useRef, useState } from 'react';
import {
  Center,
  Group,
  Loader,
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
import { useDatabase } from '@shared';
import {
  ConsultDocument,
  buildFormValues,
  stripUnusedFields,
} from 'database/rxdb-utils';
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

  const [patient, setPatient] = useState<PatientDocType | null>(null);
  const [revision, setRevision] = useState<number | string>(0);
  const patientRef = useRef<PatientDocType | null>(patient);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('patients collection or id changed');
    if (patientsCollection && patientId) {
      setIsLoading(true);
      patientsCollection
        .findOne({ selector: { id: patientId } })
        .$.subscribe((p) => {
          if (p) {
            console.log('subscription ping');
            setPatient(
              buildFormValues(
                patientSchemaTyped,
                p as PatientDocType
              ) as PatientDocType
            );
            setRevision(p.revision);
            setIsLoading(false);
          }
        });
    }
  }, [patientsCollection, patientId]);

  useEffect(() => {
    patientRef.current = patient;
  }, [patient]);

  const patientAge =
    patient?.dateOfBirth && calculateAge(new Date(patient.dateOfBirth));

  const sendUpdate = () => {
    if (patientRef.current) {
      console.log(patientRef.current);
      patientsCollection?.upsert(stripUnusedFields(patientRef.current));
    }
  };

  if (isLoading)
    // This is currently ugly but it prevents inputs from being loaded with incorrect defaultValues
    return (
      <Center className="w-full h-full">
        <Loader />
      </Center>
    );

  return (
    <SimpleGrid
      onBlur={sendUpdate}
      cols={3}
      spacing={180}
      breakpoints={[
        { maxWidth: 1024, cols: 2, spacing: 100 },
        { maxWidth: 1280, cols: 3, spacing: 100 },
      ]}
      key={revision}
    >
      <Stack>
        <TextInput
          required
          label="First name:"
          defaultValue={patient?.firstName}
          onChange={(e) =>
            patientRef.current &&
            (patientRef.current.firstName = e.currentTarget.value)
          }
        />
        <TextInput
          required
          label="Last name:"
          defaultValue={patient?.lastName}
          onChange={(e) =>
            patientRef.current &&
            (patientRef.current.lastName = e.currentTarget.value)
          }
        />
        <Group className="justify-between">
          <DatePicker
            required
            label="Date of birth:"
            defaultValue={new Date(patient?.dateOfBirth ?? '')}
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
            defaultValue={Number(patientAge)}
            disabled
          />
        </Group>
        <TextInput label="Patient ID:" value={patient?.id} disabled />
        <EthnicitySelect
          defaultValue={patient?.ethnicity ?? null}
          onChange={(s) =>
            patientRef.current &&
            (patientRef.current.ethnicity = s ?? undefined)
          }
        />
        <GenderSelect
          defaultValue={patient?.gender ?? null}
          onChange={(s) =>
            patientRef.current && (patientRef.current.gender = s ?? undefined)
          }
        />
        <SchoolAutocomplete
          defaultValue={patient?.school}
          onChange={(s) =>
            patientRef.current && (patientRef.current.school = s ?? undefined)
          }
        />
        <Group className="w-full">
          <NumberInput
            label="Year:"
            className="w-20"
            defaultValue={Number(patient?.yearLevel)}
            onChange={(n) =>
              patientRef.current &&
              (patientRef.current.yearLevel = n ?? undefined)
            }
          />
          <TextInput
            label="Room:"
            className="grow"
            defaultValue={patient?.room}
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
          defaultValue={patient?.streetAddress}
          onChange={(e) =>
            patientRef.current &&
            (patientRef.current.streetAddress = e.currentTarget.value)
          }
        />
        <Group className="w-full" grow>
          <TextInput
            placeholder="Suburb"
            defaultValue={patient?.suburb}
            onChange={(e) =>
              patientRef.current &&
              (patientRef.current.suburb = e.currentTarget.value)
            }
          />
          <TextInput
            placeholder="City"
            defaultValue={patient?.city}
            onChange={(e) =>
              patientRef.current &&
              (patientRef.current.city = e.currentTarget.value)
            }
          />
        </Group>
        <TextInput
          placeholder="Postcode"
          defaultValue={patient?.postcode}
          onChange={(e) =>
            patientRef.current &&
            (patientRef.current.postcode = e.currentTarget.value)
          }
        />
        <TextInput
          label="Caregiver First Name:"
          defaultValue={patient?.caregiverFirstName}
          onChange={(e) =>
            patientRef.current &&
            (patientRef.current.caregiverFirstName = e.currentTarget.value)
          }
        />
        <TextInput
          label="Caregiver Last Name:"
          defaultValue={patient?.caregiverLastName}
          onChange={(e) =>
            patientRef.current &&
            (patientRef.current.caregiverLastName = e.currentTarget.value)
          }
        />
        <TextInput
          label="Phone:"
          defaultValue={patient?.phoneNumber}
          onChange={(e) =>
            patientRef.current &&
            (patientRef.current.phoneNumber = e.currentTarget.value)
          }
        />
        <TextInput
          label="Email:"
          defaultValue={patient?.email}
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
          defaultValue={patient?.adminNotes}
          onChange={(e) =>
            patientRef.current &&
            (patientRef.current.adminNotes = e.currentTarget.value)
          }
        />
        <RecallsTable patientConsults={patientConsults} />
      </Stack>
    </SimpleGrid>
  );
};

export default PatientInputs;
