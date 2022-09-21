import { SimpleGrid, TextInput, Title } from '@mantine/core';
import React from 'react';

type NearAcuityInputsProps = {
  rightNearAcuity: string;
  onUpdateRightNearAcuity: (value: string | null) => void;
  leftNearAcuity: string;
  onUpdateLeftNearAcuity: (value: string | null) => void;
  bothNearAcuity: string;
  onUpdateBothNearAcuity: (value: string | null) => void;
};

export const NearAcuityInputs = ({
  rightNearAcuity,
  onUpdateRightNearAcuity,
  leftNearAcuity,
  onUpdateLeftNearAcuity,
  bothNearAcuity,
  onUpdateBothNearAcuity,
}: NearAcuityInputsProps) => {
  return (
    <>
      <Title order={6} className="-mb-3">
        Near Acuity
      </Title>
      <SimpleGrid cols={3}>
        <TextInput
          label="Right:"
          {...{
            rightNearAcuity: rightNearAcuity,
            onUpdateRightNearAcuity: onUpdateRightNearAcuity,
          }}
          required
        />
        <TextInput
          label="Left:"
          {...{
            leftNearAcuity: leftNearAcuity,
            onUpdateLeftNearAcuity: onUpdateLeftNearAcuity,
          }}
          required
        />
        <TextInput
          label="Both:"
          {...{
            bothNearAcuity: bothNearAcuity,
            onUpdateBothNearAcuity: onUpdateBothNearAcuity,
          }}
        />
      </SimpleGrid>
    </>
  );
};
