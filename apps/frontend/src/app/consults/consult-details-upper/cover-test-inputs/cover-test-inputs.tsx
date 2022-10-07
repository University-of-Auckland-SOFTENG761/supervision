import { SimpleGrid, TextInput, Title } from '@mantine/core';
import { ConsultDocType } from 'database';
import { UseFormRegister, FieldValues } from 'react-hook-form';
import { RxDocument } from 'rxdb';

type CoverTestInputsProps = {
  consult: RxDocument<ConsultDocType>;
  register: UseFormRegister<FieldValues>;
};

export const CoverTestInputs = ({
  consult,
  register,
}: CoverTestInputsProps) => {
  return (
    <>
      <Title order={6} className="-mb-3">
        Cover Test
      </Title>
      <SimpleGrid cols={3}>
        <TextInput
          label="Distance:"
          classNames={{ label: 'whitespace-nowrap' }}
          defaultValue={consult.get('coverTestDistance')}
          {...register('consult.coverTestDistance')}
          maxLength={40}
        />
        <TextInput
          maxLength={40}
          label="Near:"
          defaultValue={consult.get('coverTestNear')}
          {...register('consult.coverTestNear')}
        />
      </SimpleGrid>
    </>
  );
};
