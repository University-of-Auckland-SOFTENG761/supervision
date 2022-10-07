import React from 'react';
import { Autocomplete } from '@mantine/core';

type LensTypeAutocompleteProps = {
  value: string | undefined;
  onChange: (value: string | null) => void;
};

const LensTypeAutocomplete = ({
  value,
  onChange,
}: LensTypeAutocompleteProps) => {
  const lensTypes = [
    'Single Vision Distance',
    'Single Vision Near',
    'Multifocal',
    'Occupationals',
    'Bifocal',
  ];

  return (
    <Autocomplete
      label="Lens Type:"
      data={lensTypes}
      value={value}
      onChange={onChange}
    />
  );
};

export default LensTypeAutocomplete;
