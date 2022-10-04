import { SimpleGrid, TextInput, TextInputProps, Title } from '@mantine/core';

type VisualAcuityInputsProps = {
  visualAcuityRightProps: TextInputProps;
  visualAcuityLeftProps: TextInputProps;
  visualAcuityBothProps: TextInputProps;
};

export const VisualAcuityInputs = ({
  visualAcuityRightProps,
  visualAcuityLeftProps,
  visualAcuityBothProps,
}: VisualAcuityInputsProps) => {
  return (
    <>
      <Title order={6} className="-mb-3">
        Visual Acuity
      </Title>
      <SimpleGrid cols={3}>
        <TextInput label="Right:" required {...visualAcuityRightProps} />
        <TextInput label="Left:" required {...visualAcuityLeftProps} />
        <TextInput label="Both:" {...visualAcuityBothProps} />
      </SimpleGrid>
    </>
  );
};
