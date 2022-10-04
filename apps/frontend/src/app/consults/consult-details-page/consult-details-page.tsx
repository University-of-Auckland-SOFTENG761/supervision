import { ConsultInputs } from '../consult-inputs';
import { Center, ScrollArea, Stack, Text } from '@mantine/core';
import { useSearchParams } from 'react-router-dom';
import { useDatabase } from '@shared';

export const ConsultDetailsPage = () => {
  const { consults } = useDatabase();
  const [searchParams] = useSearchParams();
  const consultId = searchParams.get('consultId');
  const consult = consults?.find((c) => c.id === consultId);

  return (
    <ScrollArea className="h-full p-8">
      <Stack>
        {consult ? (
          <ConsultInputs />
        ) : (
          <Center>
            <Text>No consult selected</Text>
          </Center>
        )}
      </Stack>
    </ScrollArea>
  );
};

export default ConsultDetailsPage;
