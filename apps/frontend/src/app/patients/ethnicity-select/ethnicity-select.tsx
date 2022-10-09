import { forwardRef, Ref } from 'react';
import { Select } from '@mantine/core';

type EthnicitySelectProps = {
  value?: string | null;
  defaultValue?: string | null;
  onChange?: (value: string | null) => void;
};

export enum Ethnicities {
  'NZ European' = 'nz european',
  'Other European' = 'other european',
  'NZ Maori' = 'nz maori',
  'Samoan' = 'samoan',
  'Cook Island Maori' = 'cook island maori',
  'Tongan' = 'tongan',
  'Niuean' = 'niuean',
  'Tokelauan' = 'tokelauan',
  'Fijian' = 'fijian',
  'Other Pacific Island' = 'other pacific island',
  'South East Asian' = 'south east asian',
  'Chinese' = 'chinese',
  'Indian' = 'indian',
  'Other Asian' = 'other asian',
  'Middle Eastern' = 'middle eastern',
  'Latin American Hispanic' = 'latin american hispanic',
  'African' = 'african',
  'Other Ethnicity' = 'other ethnicity',
}

const EthnicitySelect = forwardRef(
  (
    { value, defaultValue, onChange }: EthnicitySelectProps,
    ref: Ref<HTMLInputElement> | undefined
  ) => {
    return (
      <Select
        label="Ethnicity:"
        placeholder="Pick one"
        data={Array.from(
          (Object.keys(Ethnicities) as Array<keyof typeof Ethnicities>).map(
            (key) => {
              return { value: Ethnicities[key], label: key };
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

export default EthnicitySelect;
