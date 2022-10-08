import { SimpleGrid, TextInput, Title } from '@mantine/core';
import { ConsultDocType } from 'database';
import { UseFormRegister, FieldValues } from 'react-hook-form';
import { RxDocument } from 'rxdb';

type NearAcuityInputsProps = {
  consult: RxDocument<ConsultDocType>;
  register: UseFormRegister<FieldValues>;
};

export const NearAcuityInputs = ({
  consult,
  register,
}: NearAcuityInputsProps) => {
  return (
    <>
      <Title order={6} className="-mb-3">
        Near Acuity
      </Title>
      <SimpleGrid cols={3}>
        <TextInput
          maxLength={10}
          label="Right:"
          required
          defaultValue={consult.get('nearAcuityRight')}
          {...register('consult.nearAcuityRight')}
        />
        <TextInput
          maxLength={10}
          label="Left:"
          required
          defaultValue={consult.get('nearAcuityLeft')}
          {...register('consult.nearAcuityLeft')}
        />
        <TextInput
          maxLength={10}
          label="Both:"
          defaultValue={consult.get('nearAcuityBoth')}
          {...register('consult.nearAcuityBoth')}
        />
      </SimpleGrid>
    </>
  );
};
