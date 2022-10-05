import { useEffect, useState } from 'react';
import { Center, ScrollArea, SimpleGrid, Text } from '@mantine/core';
import { Button, useDatabase } from '@shared';
import { PatientTabs } from '../patient-tabs';
import { PatientInputs } from '../patient-inputs';
import { PatientRecords } from '../patient-records';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ConsultDocument } from 'database/rxdb-utils';

export const PatientDetailsPage = () => {
  const { consults, newConsult } = useDatabase();
  const [searchParams] = useSearchParams();
  const patientId = searchParams.get('patientId');
  const [patientConsults, setPatientConsults] = useState<ConsultDocument[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!consults || !patientId) return;
    setPatientConsults(
      consults.filter((consult) => consult.patientId === patientId) ?? []
    );
  }, [patientId, consults]);

  const handleCreateNewRecord = () => {
    const patientRecordsTab =
      searchParams.get('patientRecordsTab') ?? 'consult';
    if (newConsult && patientId && patientRecordsTab === 'consult') {
      const newConsultId = newConsult(patientId);
      navigate(`/consult-details?consultId=${newConsultId}`);
    }
  };

  return (
    <>
      <PatientTabs />
      {patientId ? (
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
              patientConsults={patientConsults}
              patientId={patientId}
            />
          </SimpleGrid>
          <div className="flex mt-5 -mb-5 justify-end w-full">
            <Button onClick={handleCreateNewRecord} className="ml-auto">
              CREATE NEW RECORD
            </Button>
          </div>
          <PatientRecords className="pb-5" patientConsults={patientConsults} />
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
