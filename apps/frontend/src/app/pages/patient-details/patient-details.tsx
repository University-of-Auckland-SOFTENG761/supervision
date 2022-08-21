import React from 'react';
import { ScrollArea, SimpleGrid, Stack, Textarea } from '@mantine/core';
import {
  PatientInputs,
  RecallsTable,
  PatientRecords,
  PatientTabs,
} from '@components';

export type IPatient = {
  uid: string;
  firstName?: string;
  lastName?: string;
  dob?: string;
  patientId?: string;
  ethnicity?: string;
  sex?: boolean;
  school?: string;
  year?: number;
  room?: string;
  address?: {
    street?: string;
    suburb?: string;
    city?: string;
    postCode?: string;
  };
  parentName?: string;
  phoneNumber?: string;
  email?: string;
  notes?: string;
  recalls?: string[];
};

export const PatientDetailsPage = () => {
  // TODO: Replace with actual data
  const [patients, setPatients] = React.useState<IPatient[]>([
    {
      uid: '8c78e8d5-26e5-4a99-a112-0b8602bf2c1b',
      firstName: 'Yulia',
      lastName: 'Pechorina',
      dob: '21/02/2001',
      patientId: '12345',
      ethnicity: 'European',
      sex: true,
      school: 'The University of Auckland',
      year: 4,
      room: 'N/A',
      address: {
        street: '1000 Fifth Avenue',
        suburb: 'Manhattan',
        city: 'New York',
        postCode: '10028',
      },
      parentName: 'John Doe',
      phoneNumber: '+64 9 12345678',
      email: 'yulia@gmail.com',
      notes: 'Nothing to add',
      recalls: ['22/08/2022', '22/08/2023'],
    },
    {
      uid: 'c7695a78-33ae-4f71-9c54-4a3336628965',
      firstName: 'Kid',
      lastName: 'Cudi',
      dob: '30/01/1984',
      patientId: '54321',
      sex: true,
    },
  ]);

  const [currentPatient, setCurrentPatient] = React.useState<IPatient>(
    patients[0]
  );

  const handlePatientChange = (uid: string) => {
    const patient = patients.find((p) => p.uid === uid);
    if (patient) {
      setCurrentPatient(patient);
    }
  };

  const handleUpdatePatient = (updatedPatient: IPatient) => {
    setCurrentPatient(updatedPatient);
    const newPatients = patients.map((p) => {
      if (p.uid === updatedPatient.uid) {
        return updatedPatient;
      }
      return p;
    });
    setPatients(newPatients);
  };

  return (
    <>
      <PatientTabs patients={patients} onPatientChange={handlePatientChange} />
      <ScrollArea className="h-full p-8">
        <SimpleGrid
          cols={3}
          spacing={180}
          breakpoints={[
            { maxWidth: 1024, cols: 2, spacing: 100 },
            { maxWidth: 1280, cols: 3, spacing: 100 },
          ]}
        >
          <PatientInputs
            patient={currentPatient}
            onUpdatePatient={handleUpdatePatient}
          />
          <Stack>
            <Textarea
              label="Admin Notes"
              placeholder="Type here..."
              autosize
              minRows={3}
            />
            <RecallsTable />
          </Stack>
        </SimpleGrid>
        <PatientRecords className="py-5" />
      </ScrollArea>
    </>
  );
};

export default PatientDetailsPage;
