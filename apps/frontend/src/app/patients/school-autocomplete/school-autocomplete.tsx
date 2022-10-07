import { Autocomplete } from '@mantine/core';

type SchoolAutocompleteProps = {
  defaultValue?: string | null;
  onChange?: (value: string) => void;
};

const SchoolAutocomplete = ({
  defaultValue,
  onChange,
}: SchoolAutocompleteProps) => {
  // TODO: Replace with real data
  const schoolData = ['The University of Auckland', 'Fake University'];

  return (
    <Autocomplete
      maxLength={45}
      label="School:"
      data={schoolData}
      defaultValue={defaultValue ?? undefined}
      onChange={onChange}
    />
  );
};

export default SchoolAutocomplete;
