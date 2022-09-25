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
  spectaclesCode?: string;
  colour?: string;
  lensType?: string;
  heights?: string;
  spectaclesNote?: string;
  // Column 5
  posteriorHealth?: string;
  laypersonNotes?: string;
  recallDate?: Date;
  recallDescription?: string;

  // Bottom Table Fields
  // prevSpecRxGiven
  prevSpecRxGivenRightEyeSphere?: number;
  prevSpecRxGivenRightCylinder?: number;
  prevSpecRxGivenRightAxis?: number;
  prevSpecRxGivenRightVA?: string;
  prevSpecRxGivenRightAdd?: number;
  prevSpecRxGivenLeftEyeSphere?: number;
  prevSpecRxGivenLeftCylinder?: number;
  prevSpecRxGivenLeftAxis?: number;
  prevSpecRxGivenLeftVA?: string;
  prevSpecRxGivenLeftAdd?: number;
  // habitual
  habitualRightEyeSphere?: number;
  habitualRightCylinder?: number;
  habitualRightAxis?: number;
  habitualRightVA?: string;
  habitualRightAdd?: number;
  habitualLeftEyeSphere?: number;
  habitualLeftCylinder?: number;
  habitualLeftAxis?: number;
  habitualLeftVA?: string;
  habitualLeftAdd?: number;
  // dryRetinoscopy
  dryRetinoscopyRightEyeSphere?: number;
  dryRetinoscopyRightCylinder?: number;
  dryRetinoscopyRightAxis?: number;
  dryRetinoscopyRightVA?: string;
  dryRetinoscopyRightAdd?: number;
  dryRetinoscopyLeftEyeSphere?: number;
  dryRetinoscopyLeftCylinder?: number;
  dryRetinoscopyLeftAxis?: number;
  dryRetinoscopyLeftVA?: string;
  dryRetinoscopyLeftAdd?: number;
  // autoRefraction
  autoRefractionRightEyeSphere?: number;
  autoRefractionRightCylinder?: number;
  autoRefractionRightAxis?: number;
  autoRefractionRightVA?: string;
  autoRefractionRightAdd?: number;
  autoRefractionLeftEyeSphere?: number;
  autoRefractionLeftCylinder?: number;
  autoRefractionLeftAxis?: number;
  autoRefractionLeftVA?: string;
  autoRefractionLeftAdd?: number;
  // wetRefraction
  wetRefractionRightEyeSphere?: number;
  wetRefractionRightCylinder?: number;
  wetRefractionRightAxis?: number;
  wetRefractionRightVA?: string;
  wetRefractionRightAdd?: number;
  wetRefractionLeftEyeSphere?: number;
  wetRefractionLeftCylinder?: number;
  wetRefractionLeftAxis?: number;
  wetRefractionLeftVA?: string;
  wetRefractionLeftAdd?: number;
  // subjectiveRefraction
  subjectiveRefractionRightEyeSphere?: number;
  subjectiveRefractionRightCylinder?: number;
  subjectiveRefractionRightAxis?: number;
  subjectiveRefractionRightVA?: string;
  subjectiveRefractionRightAdd?: number;
  subjectiveRefractionLeftEyeSphere?: number;
  subjectiveRefractionLeftCylinder?: number;
  subjectiveRefractionLeftAxis?: number;
  subjectiveRefractionLeftVA?: string;
  subjectiveRefractionLeftAdd?: number;
  // givenRefraction
  RightEyeSphere?: number;
  RightCylinder?: number;
  RightAxis?: number;
  RightVA?: string;
  RightAdd?: number;
  LeftEyeSphere?: number;
  LeftCylinder?: number;
  LeftAxis?: number;
  LeftVA?: string;
  LeftAdd?: number;
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
