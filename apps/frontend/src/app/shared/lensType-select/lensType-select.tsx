import React from 'react';
import { Select } from '@mantine/core';

type LensTypeSelectProps = {
  value: string | undefined;
  onChange: (value: string | null) => void;
};

export enum LensTypes {
  'Single Vision Distance' = 'single vision distance',
  'Single Vision Near' = 'single vision near',
  'Multifocal' = 'multifocal',
  'Occupationals' = 'occupationals',
  'Bifocal' = 'bifocal',
}

const LensTypeSelect = ({ value, onChange }: LensTypeSelectProps) => {
  return (
    <Select
      label="Lens Type:"
      placeholder="Select lens type"
      data={Array.from(
        (Object.keys(LensTypes) as Array<keyof typeof LensTypes>).map((key) => {
          return { value: LensTypes[key], label: key };
        })
      )}
      searchable
      value={value}
      onChange={onChange}
    />
  );
};

export default LensTypeSelect;
