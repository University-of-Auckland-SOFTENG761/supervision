import { NumberInput, SimpleGrid, Title } from '@mantine/core';
import { TimeInput, TimeInputProps } from '@mantine/dates';
import React from 'react';

type EyePressureInputsProps = {
  eyePressureRightProps: {
    value: string;
    onChange: (value?: number) => void;
  };
  eyePressureLeftProps: {
    value: string;
    onChange: (value?: number) => void;
  };
  eyePressureTimestampProps: TimeInputProps;
  setEyePressureTimestamp: (timestamp: Date | null) => void;
};

export const EyePressureInputs = ({
  eyePressureRightProps,
  eyePressureLeftProps,
  eyePressureTimestampProps,
  setEyePressureTimestamp,
}: EyePressureInputsProps) => {
  return (
    <>
      <Title order={6} className="-mb-3">
        Eye Pressures (mmHg)
      </Title>
      <SimpleGrid cols={3}>
        <NumberInput
          label="Right:"
          onChange={(value) => {
            eyePressureRightProps.onChange(value);
            if (
              value !== undefined ||
              eyePressureLeftProps.value !== undefined
            ) {
              !eyePressureTimestampProps.value &&
                setEyePressureTimestamp(new Date());
            } else {
              setEyePressureTimestamp(null);
            }
          }}
        />
        <NumberInput
          label="Left:"
          onChange={(value) => {
            eyePressureLeftProps.onChange(value);
            if (
              value !== undefined ||
              eyePressureRightProps.value !== undefined
            ) {
              !eyePressureTimestampProps.value &&
                setEyePressureTimestamp(new Date());
            } else {
              setEyePressureTimestamp(null);
            }
          }}
        />
      </SimpleGrid>
      <TimeInput
        format="12"
        size="xs"
        className="w-28 -mt-2"
        {...eyePressureTimestampProps}
      />
    </>
  );
};
