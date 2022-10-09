import { Select } from '@mantine/core';
import { forwardRef, Ref } from 'react';

type GenderSelectProps = {
  value?: string | null;
  defaultValue?: string | null;
  onChange?: (value: string | null) => void;
};

export enum Gender {
  'Female' = 'female',
  'Male' = 'male',
  'Other' = 'other',
  'Prefer not to say' = 'prefer not to say',
}

const GenderSelect = forwardRef(
  (
    { value, defaultValue, onChange }: GenderSelectProps,
    ref: Ref<HTMLInputElement> | undefined
  ) => {
    return (
      <Select
        label="Gender:"
        placeholder="Pick one"
        data={Array.from(
          (Object.keys(Gender) as Array<keyof typeof Gender>).map((key) => {
            return { value: Gender[key], label: key };
          })
        )}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        ref={ref}
      />
    );
  }
);

export default GenderSelect;
