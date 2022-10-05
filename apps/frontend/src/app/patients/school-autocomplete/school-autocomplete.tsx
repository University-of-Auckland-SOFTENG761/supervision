import { Autocomplete } from '@mantine/core';

type SchoolAutocompleteProps = {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string | null) => void;
};

const SchoolAutocomplete = ({
  value,
  defaultValue,
  onChange,
}: SchoolAutocompleteProps) => {
  // TODO: Replace with real data
  const schoolData = ['The University of Auckland', 'Fake University'];

  return (
    <Autocomplete
      label="School:"
      data={schoolData}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
    />
  );
};

export default SchoolAutocomplete;
