import { Autocomplete } from '@mantine/core';
import { forwardRef, Ref } from 'react';

type SchoolAutocompleteProps = {
  defaultValue?: string | null;
  onChange?: (value: string) => void;
};

const SchoolAutocomplete = forwardRef(
  (
    { defaultValue, onChange }: SchoolAutocompleteProps,
    ref: Ref<HTMLInputElement> | undefined
  ) => {
    // TODO: Replace with real data
    const schoolData = ['The University of Auckland', 'Fake University'];

    return (
      <Autocomplete
        maxLength={45}
        label="School:"
        data={schoolData}
        defaultValue={defaultValue ?? undefined}
        onChange={onChange}
        ref={ref}
      />
    );
  }
);

export default SchoolAutocomplete;
