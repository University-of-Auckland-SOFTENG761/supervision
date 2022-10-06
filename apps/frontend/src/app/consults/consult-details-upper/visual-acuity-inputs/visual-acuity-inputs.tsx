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
        <TextInput
          maxLength={10}
          label="Right:"
          required
          {...visualAcuityRightProps}
        />
        <TextInput
          maxLength={10}
          label="Left:"
          required
          {...visualAcuityLeftProps}
        />
        <TextInput maxLength={10} label="Both:" {...visualAcuityBothProps} />
      </SimpleGrid>
    </>
  );
};
