import { SimpleGrid, TextInput, TextInputProps, Title } from '@mantine/core';

type NearAcuityInputsProps = {
  nearAcuityRightProps: TextInputProps;
  nearAcuityLeftProps: TextInputProps;
  nearAcuityBothProps: TextInputProps;
};

export const NearAcuityInputs = ({
  nearAcuityRightProps,
  nearAcuityLeftProps,
  nearAcuityBothProps,
}: NearAcuityInputsProps) => {
  return (
    <>
      <Title order={6} className="-mb-3">
        Near Acuity
      </Title>
      <SimpleGrid cols={3}>
        <TextInput label="Right:" required {...nearAcuityRightProps} />
        <TextInput label="Left:" required {...nearAcuityLeftProps} />
        <TextInput label="Both:" {...nearAcuityBothProps} />
      </SimpleGrid>
    </>
  );
};
