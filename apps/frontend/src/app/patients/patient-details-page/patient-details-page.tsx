import { useCallback, useState } from 'react';
import { Center, ScrollArea, SimpleGrid, Text } from '@mantine/core';
import { Button } from '@shared';
import { PatientTabs } from '../patient-tabs';
import { PatientInputs } from '../patient-inputs';
import { PatientRecords } from '../patient-records';

export type IPatient = {
  id: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  ethnicity?: string;
  gender?: string;
  school?: string;
  yearLevel?: number;
  room?: string;
  streetAddress?: string;
  suburb?: string;
  city?: string;
  postcode?: string;
  caregiverFirstName?: string;
  caregiverLastName?: string;
  phoneNumber?: string;
  email?: string;
  adminNotes?: string;
};

export const PatientDetailsPage = () => {
  const [currentPatientUid, setCurrentPatientUid] = useState<
    string | undefined
  >();

  const handlePatientChange = useCallback((uid: string) => {
    setCurrentPatientUid(uid);
  }, []);

  return (
    <>
      <PatientTabs
        currentPatientUid={currentPatientUid}
        onPatientChange={handlePatientChange}
      />
      {currentPatientUid ? (
        <ScrollArea className="h-full p-8">
          <SimpleGrid
            cols={3}
            spacing={180}
            breakpoints={[
              { maxWidth: 1024, cols: 2, spacing: 100 },
              { maxWidth: 1280, cols: 3, spacing: 100 },
            ]}
          >
            <PatientInputs patientUid={currentPatientUid} />
          </SimpleGrid>
          <div className="flex mt-5 -mb-5 justify-end w-full">
            <Button className="ml-auto">CREATE NEW RECORD</Button>
          </div>
          <PatientRecords className="pb-5" />
        </ScrollArea>
      ) : (
        <Center className="h-full">
          <Text>Click on a patient to view their details</Text>
        </Center>
      )}
    </>
  );
};

export default PatientDetailsPage;
