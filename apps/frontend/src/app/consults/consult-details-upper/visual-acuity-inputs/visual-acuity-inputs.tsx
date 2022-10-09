import { SimpleGrid, TextInput, Title } from '@mantine/core';
import { ConsultDocType } from 'database';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { RxDocument } from 'rxdb';

type VisualAcuityInputsProps = {
  consult: RxDocument<ConsultDocType>;
  register: UseFormRegister<FieldValues>;
};

export const VisualAcuityInputs = ({
  consult,
  register,
}: VisualAcuityInputsProps) => {
  return (
    <>
      <Title order={6} className="-mb-3">
        Visual Acuity
      </Title>
      <SimpleGrid cols={3}>
        <TextInput
          maxLength={10}
          label="Right:"
          required
          defaultValue={consult.get('visualAcuityRight')}
          {...register('consult.visualAcuityRight')}
        />
        <TextInput
          maxLength={10}
          label="Left:"
          required
          defaultValue={consult.get('visualAcuityLeft')}
          {...register('consult.visualAcuityLeft')}
        />
        <TextInput
          maxLength={10}
          label="Both:"
          defaultValue={consult.get('visualAcuityBoth')}
          {...register('consult.visualAcuityBoth')}
        />
      </SimpleGrid>
    </>
  );
};
