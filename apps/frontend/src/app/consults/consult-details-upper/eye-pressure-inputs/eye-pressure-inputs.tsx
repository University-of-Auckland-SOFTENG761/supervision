import { NumberInput, SimpleGrid, Title } from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import { ConsultDocType } from 'database';
import { parseDateForInput, parseNumberForInput } from 'database/rxdb-utils';
import { UseFormRegister, FieldValues } from 'react-hook-form';
import { RxDocument } from 'rxdb';

type EyePressureInputsProps = {
  consult: RxDocument<ConsultDocType>;
  register: UseFormRegister<FieldValues>;
  setValue: (name: string, value: unknown, urgent?: boolean) => void;
};

export const EyePressureInputs = ({
  consult,
  register,
  setValue,
}: EyePressureInputsProps) => {
  return (
    <>
      <Title order={6} className="-mb-3">
        Eye Pressures (mmHg)
      </Title>
      <SimpleGrid cols={3}>
        <NumberInput
          label="Right:"
          defaultValue={parseNumberForInput(consult.get('eyePressureRight'))}
          {...register('consult.eyePressureRight', {
            valueAsNumber: true,
          })}
          max={undefined}
          min={undefined}
          onChange={(value) => {
            setValue('consult.eyePressureRight', value);
            if (value && consult.get('eyePressureLeft')) {
              setValue('consult.eyePressureTimestamp', new Date(), true);
            } else {
              setValue('consult.eyePressureTimestamp', undefined, true);
            }
          }}
        />
        <NumberInput
          label="Left:"
          defaultValue={parseNumberForInput(consult.get('eyePressureLeft'))}
          {...register('consult.eyePressureLeft', {
            valueAsNumber: true,
          })}
          max={undefined}
          min={undefined}
          onChange={(value) => {
            setValue('consult.eyePressureLeft', value);
            if (value && consult.get('eyePressureRight')) {
              setValue('consult.eyePressureTimestamp', new Date(), true);
            } else {
              setValue('consult.eyePressureTimestamp', undefined, true);
            }
          }}
        />
      </SimpleGrid>
      <TimeInput
        format="12"
        size="xs"
        className="w-28 -mt-2"
        value={parseDateForInput(consult.get('eyePressureTimestamp'))}
        onChange={(value) => {
          setValue('consult.eyePressureTimestamp', value ?? undefined, true);
        }}
      />
    </>
  );
};
