import { useCallback, useEffect, useState } from 'react';
import { Center, ScrollArea, SimpleGrid, Text } from '@mantine/core';
import { Button, useDatabase } from '@shared';
import { PatientTabs } from '../patient-tabs';
import { PatientInputs } from '../patient-inputs';
import { PatientRecords } from '../patient-records';
import { useSearchParams } from 'react-router-dom';
import { ConsultDocument } from 'database/rxdb-utils';

export const PatientDetailsPage = () => {
  const { consults } = useDatabase();
  const [searchParams] = useSearchParams();
  const patientId = searchParams.get('patientId');
  const [userConsults, setUserConsults] = useState<ConsultDocument[]>([]);

  useEffect(() => {
    if (!consults || !patientId) return;
    setUserConsults(
      consults.filter((consult) => consult.patientId === patientId) ?? []
    );
  }, [patientId, consults]);

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
            <PatientInputs userConsults={userConsults} />
          </SimpleGrid>
          <div className="flex mt-5 -mb-5 justify-end w-full">
            <Button className="ml-auto">CREATE NEW RECORD</Button>
          </div>
          <PatientRecords className="pb-5" userConsults={userConsults} />
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
