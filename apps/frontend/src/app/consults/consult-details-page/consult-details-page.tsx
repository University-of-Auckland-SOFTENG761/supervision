import { useState, useEffect } from 'react';
import { ConsultInputs } from '../consult-inputs';
import { ScrollArea, Stack } from '@mantine/core';
import { ConsultDocument } from 'database/rxdb-utils';
import { useSearchParams } from 'react-router-dom';
import { useDatabase } from '@shared';

export const ConsultDetailsPage = () => {
  const [searchParams] = useSearchParams();
  const consultId = searchParams.get('consultId');
  const { consults, updateConsult } = useDatabase();

  const [currentConsult, setCurrentConsult] = useState<
    ConsultDocument | undefined
  >();

  useEffect(() => {
    if (!consults || !consultId) return;
    setCurrentConsult(
      consults.find((consult) => consult.id === consultId) ?? undefined
    );
  }, [consultId, consults]);

  return (
    <ScrollArea className="h-full p-8">
      <Stack>
        {currentConsult && updateConsult && (
          <ConsultInputs
            consult={currentConsult}
            onUpdateConsult={updateConsult}
          />
        )}
      </Stack>
    </ScrollArea>
  );
};

export default ConsultDetailsPage;
