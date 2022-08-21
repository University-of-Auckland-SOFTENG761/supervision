import React from 'react';
import { ScrollArea, SimpleGrid, Stack, Textarea } from '@mantine/core';
import { PatientInputs, RecallsTable, PatientRecords } from '@components';

export const PatientDetailsPage = () => {
  return (
    <ScrollArea className="h-full p-0">
      <SimpleGrid
        cols={3}
        spacing={180}
        breakpoints={[
          { maxWidth: 1024, cols: 2, spacing: 100 },
          { maxWidth: 1280, cols: 3, spacing: 100 },
        ]}
        className="p-3"
      >
        <PatientInputs />
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
  );
};

export default PatientDetailsPage;
