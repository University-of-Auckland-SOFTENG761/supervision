import { ConsultInputs } from '../consult-inputs';
import { Center, ScrollArea, Stack, Text, Loader } from '@mantine/core';
import { useSearchParams } from 'react-router-dom';
import { useDatabase } from '@shared';
import { RxDocument } from 'rxdb';
import { ConsultDocType } from 'database';
import { useState, useEffect } from 'react';

export const ConsultDetailsPage = () => {
  const { consultsCollection } = useDatabase();
  const [searchParams] = useSearchParams();
  const consultId = searchParams.get('consultId');
  const [consult, setConsult] = useState<RxDocument<ConsultDocType> | null>();

  // !DO NOT REMOVE, react will not re-render if you do
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [consultRevision, setConsultRevision] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const handleUpdateConsult = async (consult: ConsultDocType) => {
    await consultsCollection?.atomicUpsert(consult);
  };

  useEffect(() => {
    if (consultsCollection && consultId) {
      setIsLoading(true);
      consultsCollection
        .findOne({ selector: { id: consultId } })
        .$.subscribe((c) => {
          if (c) {
            setConsult(c);
            setConsultRevision(c.revision); //!MUST NOT BE REMOVED
          }
          setIsLoading(false);
        });
    }
  }, [consultsCollection, consultId]);

  if (isLoading && consultId) {
    // This is currently ugly but it prevents inputs from being loaded with incorrect defaultValues
    return (
      <Center className="w-full h-full">
        <Loader />
      </Center>
    );
  }

  return (
    <ScrollArea className="h-full p-8">
      <Stack>
        {consult ? (
          <ConsultInputs
            consult={consult}
            updateConsult={handleUpdateConsult}
          />
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
