import { SimpleGrid, TextInput, TextInputProps, Title } from '@mantine/core';

type CoverTestInputsProps = {
  coverTestDistanceProps: TextInputProps;
  coverTestNearProps: TextInputProps;
};

export const CoverTestInputs = ({
  coverTestDistanceProps,
  coverTestNearProps,
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
          {...coverTestDistanceProps}
        />
        <TextInput label="Near:" {...coverTestNearProps} />
      </SimpleGrid>
    </>
  );
};
