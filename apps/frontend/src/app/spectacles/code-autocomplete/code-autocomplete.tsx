import React from 'react';
import { Autocomplete } from '@mantine/core';

type CodeAutocompleteProps = {
  value: string | undefined;
  onChange: (value: string | null) => void;
};

const CodeAutocomplete = ({ value, onChange }: CodeAutocompleteProps) => {
  // Retrieve unique spectacle codes from the database
  const spectacleCodes = ['S1234', 'S5678', 'S9012'];

  return (
    <Autocomplete
      label="Spectacle Code:"
      data={spectacleCodes}
      value={value}
      onChange={onChange}
    />
  );
};

export default CodeAutocomplete;
