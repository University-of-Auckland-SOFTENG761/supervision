import { Select } from '@mantine/core';

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

const GenderSelect = ({ value, defaultValue, onChange }: GenderSelectProps) => {
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
    />
  );
};

export default GenderSelect;
