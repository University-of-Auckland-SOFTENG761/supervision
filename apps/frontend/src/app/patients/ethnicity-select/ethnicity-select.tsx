import React from 'react';
import { Select } from '@mantine/core';

type EthnicitySelectProps = {
  value: string | null;
  onChange: (value: string | null) => void;
};

const EthnicitySelect = ({ value, onChange }: EthnicitySelectProps) => {
  return (
    <Select
      label="Ethnicity:"
      placeholder="Pick one"
      data={[
        { value: 'nz european', label: 'NZ European' },
        { value: 'other european', label: 'Other European' },
        { value: 'nz maori', label: 'NZ Maori' },
        { value: 'samoan', label: 'Samoan' },
        { value: 'cook island maori', label: 'Cook Island Maori' },
        { value: 'tongan', label: 'Tongan' },
        { value: 'niuean', label: 'Niuean' },
        { value: 'tokelauan', label: 'Tokelauan' },
        { value: 'fijian', label: 'Fijian' },
        { value: 'other pacific island', label: 'Other Pacific Island' },
        { value: 'south east asian', label: 'South East Asian' },
        { value: 'chinese', label: 'Chinese' },
        { value: 'indian', label: 'Indian' },
        { value: 'other asian', label: 'Other Asian' },
        { value: 'middle eastern', label: 'Middle Eastern' },
        {
          value: 'latin america hispanic',
          label: 'Latin America Hispanic',
        },
        { value: 'african', label: 'African' },
        { value: 'other ethnicity', label: 'Other Ethnicity' },
      ]}
      value={value}
      onChange={onChange}
    />
  );
};

export default EthnicitySelect;
