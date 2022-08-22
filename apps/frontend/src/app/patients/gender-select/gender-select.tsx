import React from 'react';
import { Select } from '@mantine/core';

type GenderSelectProps = {
  value: string | null;
  onChange: (value: string | null) => void;
};

const GenderSelect = ({ value, onChange }: GenderSelectProps) => {
  return (
    <Select
      label="Gender:"
      placeholder="Pick one"
      data={[
        { value: 'female', label: 'Female' },
        { value: 'male', label: 'Male' },
        { value: 'other', label: 'Other' },
        { value: 'prefer not to say', label: 'Prefer not to say' },
      ]}
      value={value}
      onChange={onChange}
    />
  );
};

export default GenderSelect;
