import React from 'react';
import { Autocomplete } from '@mantine/core';
import { useDatabase } from '@shared';
import { forwardRef, Ref, useState, useEffect } from 'react';

type CodeAutocompleteProps = {
  label?: string | null;
  defaultValue?: string | null;
  onChange?: (value: string) => void;
};

const CodeAutocomplete = forwardRef(
  (
    { label, defaultValue, onChange }: CodeAutocompleteProps,
    ref: Ref<HTMLInputElement> | undefined
  ) => {
    const { consultsCollection } = useDatabase();
    const [codeData, setCodeData] = useState<string[]>([]);

    useEffect(() => {
      consultsCollection
        ?.find({ selector: { spectacle: { $exists: true } } })
        .exec()
        .then((consults) => {
          setCodeData(
            consults
              .map((c) => c.spectacle?.code)
              .filter((s) => s)
              .filter((s, i, a) => a.indexOf(s) === i) as string[]
          );
        });
    }, [consultsCollection]);

    return (
      <Autocomplete
        maxLength={30}
        label={label}
        data={codeData}
        defaultValue={defaultValue ?? undefined}
        onChange={onChange}
        ref={ref}
      />
    );
  }
);

export default CodeAutocomplete;
