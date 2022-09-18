import { SimpleGrid, TextInput, Title } from '@mantine/core';
import React from 'react';

type EyePressureInputsProps = {
  rightEyePressure: string;
  onUpdateRightEyePressure: (value: string | null) => void;
  leftEyePressure: string;
  onUpdateLeftEyePressure: (value: string | null) => void;
};

export const EyePressureInputs = ({
  rightEyePressure,
  onUpdateRightEyePressure,
  leftEyePressure,
  onUpdateLeftEyePressure,
}: EyePressureInputsProps) => {
  return (
    <>
      <Title order={6} className="-mb-3">
        Eye Pressures (mmHg)
      </Title>
      <SimpleGrid cols={3}>
        <TextInput
          label="Right:"
          {...{ rightEyePressure, onUpdateRightEyePressure }}
        />
        <TextInput
          label="Left:"
          {...{ leftEyePressure, onUpdateLeftEyePressure }}
        />
      </SimpleGrid>
    </>
  );
};
