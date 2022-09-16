import React from 'react';
import { ConsultInputs } from '../consult-inputs';
import { ScrollArea, Stack } from '@mantine/core';

export type IConsult = {
  uid: string;
  // Column 1
  history?: string;
  medication?: string;
  rightVisualAcuity?: string;
  leftVisualAcuity?: string;
  bothVisualAcuity?: string;
  rightNearAcuity?: string;
  leftNearAcuity?: string;
  bothNearAcuity?: string;
  distanceCoverTest?: string;
  nearCoverTest?: string;
  // Column 2
  npc?: string;
  motility?: string;
  pupils?: string;
  pupilDistance?: string;
  fieldsColourVisionOther?: string;
  eyePressureRight?: string;
  eyePressureLeft?: string;
  eyePressureTimeStamp?: Date;
  isCyclopentolate?: boolean;
  cyclopentolateTimestamp?: Date;
  isTropicamide?: boolean;
  tropicamideTimestamp?: Date;
  // Column 3
  binocularVision?: string;
  diagnosis?: string;
  // Column 4
  anteriorHealth?: string;
  management?: string;
  // Column 3/4
  spectacleCode?: string;
  colour?: string;
  lensType?: string;
  heights?: string;
  spectacleNote?: string;
  // Column 5
  posteriorHealth?: string;
  laypersonNotes?: string;
  recallDate?: Date;
  recallDescription?: string;

  // TODO: add fields for Joel's section
};

export const ConsultDetailsPage = () => {
  const [consults, setConsults] = React.useState<IConsult[]>([
    {
      uid: '9c78e8d5-26e5-4a99-a112-0b8602bf2c1c',
    },
  ]);

  const [currentConsult, setCurrentConsult] = React.useState<IConsult>(
    consults[0]
  );

  const handleUpdateConsult = (updatedConsult: IConsult) => {
    setCurrentConsult(updatedConsult);
    const newConsults = consults.map((c) => {
      if (c.uid === updatedConsult.uid) {
        return updatedConsult;
      }
      return c;
    });
    setConsults(newConsults);
  };

  return (
    <ScrollArea className="h-full p-8">
      <Stack>
        <ConsultInputs
          consult={currentConsult}
          onUpdateConsult={handleUpdateConsult}
        />
      </Stack>
    </ScrollArea>
  );
};

export default ConsultDetailsPage;
