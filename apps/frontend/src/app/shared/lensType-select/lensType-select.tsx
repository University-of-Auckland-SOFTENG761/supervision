import { Ref, forwardRef } from 'react';
import { Select } from '@mantine/core';

type LensTypeSelectProps = {
  value?: string | null;
  defaultValue?: string | null;
  onChange?: (value: string | null) => void;
};

export enum LensTypes {
  'Single Vision Distance' = 'single vision distance',
  'Single Vision Near' = 'single vision near',
  'Multifocal' = 'multifocal',
  'Occupationals' = 'occupationals',
  'Bifocal' = 'bifocal',
}

const LensTypeSelect = forwardRef(
  (
    { value, defaultValue, onChange }: LensTypeSelectProps,
    ref: Ref<HTMLInputElement> | undefined
  ) => {
    return (
      <Select
        label="Lens Type:"
        placeholder="Select lens type"
        data={Array.from(
          (Object.keys(LensTypes) as Array<keyof typeof LensTypes>).map(
            (key) => {
              return { value: LensTypes[key], label: key };
            }
          )
        )}
        ref={ref}
        searchable
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    );
  }
);

export default LensTypeSelect;
