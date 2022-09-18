import { SimpleGrid, TextInput, Title } from '@mantine/core';
import React from 'react';

type VisualAcuityInputsProps = {
  rightVisualAcuity: string;
  onUpdateRightVisualAcuity: (value: string | null) => void;
  leftVisualAcuity: string;
  onUpdateLeftVisualAcuity: (value: string | null) => void;
  bothVisualAcuity: string;
  onUpdateBothVisualAcuity: (value: string | null) => void;
};

export const VisualAcuityInputs = ({
  rightVisualAcuity,
  onUpdateRightVisualAcuity,
  leftVisualAcuity,
  onUpdateLeftVisualAcuity,
  bothVisualAcuity,
  onUpdateBothVisualAcuity,
}: VisualAcuityInputsProps) => {
  return (
    <>
      <Title order={6} className="-mb-3">
        Visual Acuity
      </Title>
      <SimpleGrid cols={3}>
        <TextInput
          label="Right:"
          {...{ rightVisualAcuity, onUpdateRightVisualAcuity }}
          required
        />
        <TextInput
          label="Left:"
          {...{ leftVisualAcuity, onUpdateLeftVisualAcuity }}
          required
        />
        <TextInput
          label="Both:"
          {...{ bothVisualAcuity, onUpdateBothVisualAcuity }}
        />
      </SimpleGrid>
    </>
  );
};
