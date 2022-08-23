import React from 'react';
import { Select } from '@mantine/core';

type EthnicitySelectProps = {
  value: string | null;
  onChange: (value: string | null) => void;
};

enum Ethnicities {
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

const EthnicitySelect = ({ value, onChange }: EthnicitySelectProps) => {
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
      searchable
      value={value}
      onChange={onChange}
    />
  );
};

export default EthnicitySelect;
