import { SimpleGrid, TextInput, Title } from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import React from 'react';

type EyePressureInputsProps = {
  eyePressureRightProps: {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement> | null) => void;
  };
  eyePressureLeftProps: {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement> | null) => void;
  };
  eyePressureTimestampProps: any;
  setEyePressureTimestamp: (timestamp: Date | undefined) => void;
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
        <TextInput
          label="Right:"
          onChange={(event) => {
            eyePressureRightProps.onChange(event);
            if (event.target.value || eyePressureLeftProps.value) {
              !eyePressureTimestampProps.value &&
                setEyePressureTimestamp(new Date());
            } else {
              setEyePressureTimestamp(undefined);
            }
          }}
        />
        <TextInput
          label="Left:"
          onChange={(event) => {
            eyePressureLeftProps.onChange(event);
            if (event.target.value || eyePressureRightProps.value) {
              !eyePressureTimestampProps.value &&
                setEyePressureTimestamp(new Date());
            } else {
              setEyePressureTimestamp(undefined);
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
