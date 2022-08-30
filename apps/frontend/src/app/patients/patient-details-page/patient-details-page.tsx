import { useState } from 'react';
import { ScrollArea, SimpleGrid } from '@mantine/core';
import { Button } from '@shared';
import { PatientTabs } from '../patient-tabs';
import { PatientInputs } from '../patient-inputs';
import { PatientRecords } from '../patient-records';
import usePatients from 'app/hooks/usePatients';

export type IPatient = {
  uid: string;
  firstName?: string;
  lastName?: string;
  dob?: string;
  patientId?: string;
  ethnicity?: string;
  gender?: string;
  school?: string;
  year?: number;
  room?: string;
  address?: {
    street?: string;
    suburb?: string;
    city?: string;
    postCode?: string;
  };
  caregiverFirstName?: string;
  caregiverLastName?: string;
  phoneNumber?: string;
  email?: string;
  notes?: string;
};

export const PatientDetailsPage = () => {
  const [currentPatientUid, setCurrentPatientUid] = useState<string | undefined>();

  const handlePatientChange = (uid: string) => {
    setCurrentPatientUid(uid);
  };

  return (
    <>
      <PatientTabs currentPatientUid={currentPatientUid} onPatientChange={handlePatientChange} />
      <ScrollArea className="h-full p-8">
        <SimpleGrid
          cols={3}
          spacing={180}
          breakpoints={[
            { maxWidth: 1024, cols: 2, spacing: 100 },
            { maxWidth: 1280, cols: 3, spacing: 100 },
          ]}
        >
          {currentPatientUid && (
            <PatientInputs
              patientUid={currentPatientUid}
            />
          )}
        </SimpleGrid>
        <div className="flex mt-5 -mb-5 justify-end w-full">
          <Button className="ml-auto">CREATE NEW RECORD</Button>
        </div>
        <PatientRecords className="pb-5" />
      </ScrollArea>
    </>
  );
};

export default PatientDetailsPage;
