import { SimpleGrid, TextInput, Title } from '@mantine/core';
import React from 'react';

type CoverTestInputsProps = {
  distanceCoverTest: string;
  onUpdateDistanceCoverTest: (value: string | null) => void;
  nearCoverTest: string;
  onUpdateNearCoverTest: (value: string | null) => void;
};

export const CoverTestInputs = ({
  distanceCoverTest,
  onUpdateDistanceCoverTest,
  nearCoverTest,
  onUpdateNearCoverTest,
}: CoverTestInputsProps) => {
  return (
    <>
      <Title order={6} className="-mb-3">
        Cover Test
      </Title>
      <SimpleGrid cols={3}>
        <TextInput
          label="Distance:"
          classNames={{ label: 'whitespace-nowrap' }}
          {...{ distanceCoverTest, onUpdateDistanceCoverTest }}
        />
        <TextInput
          label="Near:"
          {...{ nearCoverTest, onUpdateNearCoverTest }}
        />
      </SimpleGrid>
    </>
  );
};
