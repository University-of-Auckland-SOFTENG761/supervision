import React from 'react';
import { Autocomplete } from '@mantine/core';

type SchoolAutocompleteProps = {
  value: string | undefined;
  onChange: (value: string | null) => void;
};

const SchoolAutocomplete = ({ value, onChange }: SchoolAutocompleteProps) => {
  // TODO: Replace with real data
  const schoolData = ['The University of Auckland', 'Fake University'];

  return (
    <Autocomplete
      label="School:"
      data={schoolData}
      value={value}
      onChange={onChange}
    />
  );
};

export default SchoolAutocomplete;
