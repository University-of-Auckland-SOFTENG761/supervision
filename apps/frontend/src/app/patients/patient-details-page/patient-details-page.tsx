import { useCallback, useState } from 'react';
import { Center, ScrollArea, SimpleGrid, Text } from '@mantine/core';
import { Button } from '@shared';
import { PatientTabs } from '../patient-tabs';
import { PatientInputs } from '../patient-inputs';
import { PatientRecords } from '../patient-records';
import { useSearchParams } from 'react-router-dom';

export const PatientDetailsPage = () => {
  const [searchParams] = useSearchParams();
  const patientId = searchParams.get('patientId');

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
            <PatientInputs />
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
