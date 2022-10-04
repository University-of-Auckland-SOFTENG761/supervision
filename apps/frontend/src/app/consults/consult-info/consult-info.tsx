import { Avatar, Card, Group, Stack, Text } from '@mantine/core';
import { useDatabase } from '@shared';
import { useSearchParams } from 'react-router-dom';
import { applyDateFormat, calculateAge } from 'utils/date.utils';
import { toTitleCase } from 'utils/enum.utils';

export const ConsultInfo = () => {
  const { consults, patients } = useDatabase();

  const [searchParams] = useSearchParams();
  const consultId = searchParams.get('consultId');

  const consult = consultId
    ? consults?.find((p) => p.id === consultId)
    : undefined;

  const patient = patients?.find((p) => p.id === consult?.patientId);

  return (
    <Group>
      <Stack justify="flex-end">
        <Text className="text-sm whitespace-pre">
          Date:{' '}
          {applyDateFormat(
            consult?.dateConsentGiven
              ? new Date(consult.dateConsentGiven)
              : undefined
          )}
          <br />
          School: {patient?.school ?? 'N/A'}
          <br />
          Student UPI: {consult?.userEmail.split('@')[0] ?? 'UNKNOWN'}
        </Text>
      </Stack>
      <Card shadow="xs" p="xs">
        <Group className="h-full">
          <Avatar src={null} color="blue" variant="filled" radius="xl" />
          <Stack className="h-full justify-center">
            <Text className="text-sm font-bold -mb-3 mt-auto">{`${
              patient?.firstName ?? 'First'
            } ${patient?.lastName ?? 'Last'}`}</Text>
            <Group className="text-sm my-auto">
              <Text className="-mr-1">
                DOB:{' '}
                {applyDateFormat(
                  patient?.dateOfBirth
                    ? new Date(patient.dateOfBirth)
                    : undefined
                )}
              </Text>
              <Text className="-mr-1">
                Age:{' '}
                {calculateAge(
                  patient?.dateOfBirth
                    ? new Date(patient.dateOfBirth)
                    : undefined
                ) ?? 'N/A'}
              </Text>
              <Text>
                Gender: {patient?.gender ? toTitleCase(patient.gender) : 'N/A'}
              </Text>
            </Group>
          </Stack>
        </Group>
      </Card>
    </Group>
  );
};
