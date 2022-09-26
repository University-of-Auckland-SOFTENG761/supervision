import { Avatar, Card, Group, Stack, Text } from '@mantine/core';
import React from 'react';
import { applyDateFormat, calculateAge } from 'utils/date.utils';

export const ConsultInfo = () => {
  const consult = {
    dateConsentGiven: '2021-09-01T00:00:00.000Z',
    userEmail: 'ypec413@aucklanduni.ac.nz',
    patientId: '60e8b5b0-8b1b-4b1f-8c1c-8b1b4b1f8c1c',
  };

  const patient = {
    firstName: 'Test',
    lastName: 'Patient',
    school: 'The University of Auckland',
    dateOfBirth: '1999-09-01T00:00:00.000Z',
    gender: 'Female',
  };

  return (
    <Group>
      <Stack justify="flex-end">
        <Text className="text-sm whitespace-pre">
          Date: {applyDateFormat(new Date(consult.dateConsentGiven))}
          <br />
          School: {patient.school}
          <br />
          Student UPI: {consult.userEmail.split('@')[0]}
        </Text>
      </Stack>
      <Card shadow="xs" p="xs">
        <Group className="h-full">
          <Avatar src={null} color="blue" variant="filled" radius="xl" />
          <Stack className="h-full justify-center">
            <Text className="text-sm font-bold -mb-3 mt-auto">{`${patient.firstName} ${patient.lastName}`}</Text>
            <Group className="text-sm my-auto">
              <Text className="-mr-1">
                DOB: {applyDateFormat(new Date(patient.dateOfBirth))}
              </Text>
              <Text className="-mr-1">
                Age: {calculateAge(new Date(patient.dateOfBirth))}
              </Text>
              <Text>Gender: {patient.gender}</Text>
            </Group>
          </Stack>
        </Group>
      </Card>
    </Group>
  );
};
