import React from 'react';
import { Group, NumberInput, Radio, Stack, TextInput } from '@mantine/core';

export const PatientInputs = () => {
  return (
    <>
      <Stack>
        <TextInput label="First name:" />
        <TextInput label="Last name:" />
        <Group className="justify-between">
          <TextInput label="Date of birth:" />
          <NumberInput label="Age:" className="w-20" />
        </Group>
        <TextInput label="Patient ID:" />
        <Group className="justify-between">
          <TextInput label="Ethnicity:" />
          <Radio.Group label="Sex:">
            <Radio value="F" label="F" />
            <Radio value="M" label="M" />
          </Radio.Group>
        </Group>
        <TextInput label="School" />
        <Group className="w-full">
          <NumberInput label="Year:" className="w-20" />
          <TextInput label="Room:" className="grow" />
        </Group>
      </Stack>
      <Stack>
        <TextInput label="Address:" placeholder="Street Address" />
        <Group className="w-full" grow>
          <TextInput placeholder="Suburb" />
          <TextInput placeholder="City" />
        </Group>
        <TextInput placeholder="Postcode" />
        <TextInput label="Parent Full Name:" />
        <TextInput label="Phone:" />
        <TextInput label="Email:" />
      </Stack>
    </>
  );
};

export default PatientInputs;
