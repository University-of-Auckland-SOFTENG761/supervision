import { useEffect, useState } from 'react';
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
  const { patients, updatePatient } = usePatients();

  const [currentPatient, setCurrentPatient] = useState<IPatient | undefined>(
    patients[0]
  );

  useEffect(() => console.log(patients), [patients]);

  const handlePatientChange = (uid: string) => {
    const patient = patients.find((p) => p.uid === uid);
    if (patient) {
      setCurrentPatient(patient);
    }
  };

  const handleUpdatePatient = (updatedPatient: IPatient) => {
    setCurrentPatient(updatedPatient);
    updatePatient(updatedPatient);
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
          {currentPatient && (
            <PatientInputs
              patient={currentPatient}
              onUpdatePatient={handleUpdatePatient}
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
