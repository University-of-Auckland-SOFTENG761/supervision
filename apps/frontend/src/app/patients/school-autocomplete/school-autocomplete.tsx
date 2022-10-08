import { Autocomplete } from '@mantine/core';
import { useDatabase } from '@shared';
import { forwardRef, Ref, useState, useEffect } from 'react';

type SchoolAutocompleteProps = {
  defaultValue?: string | null;
  onChange?: (value: string) => void;
};

const SchoolAutocomplete = forwardRef(
  (
    { defaultValue, onChange }: SchoolAutocompleteProps,
    ref: Ref<HTMLInputElement> | undefined
  ) => {
    const { patientsCollection } = useDatabase();
    const [schoolData, setSchoolData] = useState<string[]>([]);

    useEffect(() => {
      patientsCollection
        ?.find({ selector: { school: { $exists: true } } })
        .exec()
        .then((patients) => {
          setSchoolData(
            patients
              .map((p) => p.school)
              .filter((s) => s)
              .filter((s, i, a) => a.indexOf(s) === i) as string[]
          );
        });
    }, [patientsCollection]);

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
