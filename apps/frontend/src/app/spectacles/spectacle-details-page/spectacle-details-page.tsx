import { useForm } from '@mantine/form';
import {
  Checkbox,
  Divider,
  Group,
  ScrollArea,
  Stack,
  Title,
} from '@mantine/core';
import { useParams } from 'react-router-dom';
import { Text } from '@mantine/core';
import React, { useCallback, useEffect } from 'react';

// TODO: check with in-progress schema
export type ISpectacles = {
  uid: string;
  firstName?: string;
  lastName: string;
  school: string;
  date: Date;
  spectaclesCode?: string;
  colour?: string;
  lensType?: string;
  pupillaryDistance?: number;
  heights?: string;
  spectaclesNotes?: string;
};

export const SpectacleDetailsPage = () => {
  // Fake data to match the records in spectacle-list-page
  // TODO: replace with backend data
  const spectacleRecords: ISpectacles[] = [
    {
      uid: 'fake_id_1234',
      firstName: 'Henry',
      lastName: 'Mitchell-Hibbert',
      school: 'University of Auckland',
      date: new Date(2022, 8, 25),
      spectaclesCode: '',
      colour: 'Black',
      lensType: '',
      pupillaryDistance: 120,
      heights: '',
      spectaclesNotes: '',
    },
    {
      uid: 'fake_id_1235',
      firstName: 'Joan',
      lastName: 'Doe',
      school: 'Massey High School',
      date: new Date(2021, 3, 5),
      spectaclesCode: '',
      colour: 'Blue',
      lensType: '',
      pupillaryDistance: 120,
      heights: '',
      spectaclesNotes: '',
    },
    {
      uid: 'fake_id_1236',
      firstName: 'Jezza',
      lastName: 'Doe',
      school: 'Massey High School',
      date: new Date(2022, 3, 20),
      spectaclesCode: '',
      colour: 'Green',
      lensType: '',
      pupillaryDistance: 120,
      heights: '',
      spectaclesNotes: '',
    },
  ];

  const { spectaclesUid } = useParams();

  const spectacles = spectaclesUid
    ? spectacleRecords?.find((s: ISpectacles) => s.uid === spectaclesUid)
    : undefined;

  const buildFormValues = useCallback(
    () => ({
      uid: spectacles?.uid,
      firstName: spectacles?.firstName,
      lastName: spectacles?.lastName,
      school: spectacles?.school,
      date: spectacles?.date,
      spectaclesCode: spectacles?.spectaclesCode,
      colour: spectacles?.colour,
      lensType: spectacles?.lensType,
      pupillaryDistance: spectacles?.pupillaryDistance,
      heights: spectacles?.heights,
      spectaclesNotes: spectacles?.spectaclesNotes,
    }),
    [spectacles]
  );

  const form = useForm({
    initialValues: buildFormValues(),
  });

  useEffect(() => {
    form.setValues(buildFormValues());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // TODO: ask Veeran if this should be fixed
  const optometristDetails = {
    email: 'mobile-optometry@auckland.ac.nz',
    mobile: '027 272 3319',
  };

  return (
    <ScrollArea className="h-full p-8">
      <Stack className={'w-3/5 max-w-2xl min-w-fit mx-auto flex space-y-4'}>
        <Stack>
          <Title order={3} className={'-mb-3'}>
            Spectacles Dispensing - Vision Bus
          </Title>
          {/*TODO: stringify date better*/}
          <Title order={3}>
            {spectacles
              ? spectacles.date.toDateString().substring(4)
              : undefined}
          </Title>
          <Text className="align-baseline">
            {form.getInputProps('uid').value}
          </Text>
        </Stack>

        <Title order={3}>Optometrist Contact Details</Title>
        <Group className="justify-between">
          <Text className="-mb-8">Email</Text>
          <Text className="-mb-8">{optometristDetails.email}</Text>
        </Group>
        <Divider my="xs" />
        <Group className="justify-between">
          <Text className="-mb-8">Mobile</Text>
          <Text className="-mb-8">{optometristDetails.mobile}</Text>
        </Group>
        <Divider my="xs" />

        <Title order={3}>Patient Details</Title>
        <Group className="justify-between">
          <Text className="-mb-8">Patient ID</Text>
          <Text className="-mb-8">placeholder</Text>
        </Group>
        <Divider my="xs" />
        <Group className="justify-between">
          <Text className="-mb-8">First name</Text>
          <Text className="-mb-8">{form.getInputProps('firstName').value}</Text>
        </Group>
        <Divider my="xs" />
        <Group className="justify-between">
          <Text className="-mb-8">Last name</Text>
          <Text className="-mb-8">{form.getInputProps('lastName').value}</Text>
        </Group>
        <Divider my="xs" />
        <Group className="justify-between">
          <Text className="-mb-8">School</Text>
          <Text className="-mb-8">{form.getInputProps('school').value}</Text>
        </Group>
        <Divider my="xs" />

        <Title order={3}>Spectacles Details</Title>
        <Group className="justify-between">
          <Text className="-mb-8">Spectacles code</Text>
          <Text className="-mb-8">
            {form.getInputProps('spectaclesCode').value}
          </Text>
        </Group>
        <Divider my="xs" />
        <Group className="justify-between">
          <Text className="-mb-8">Colour</Text>
          <Text className="-mb-8">{form.getInputProps('colour').value}</Text>
        </Group>
        <Divider my="xs" />
        <Group className="justify-between">
          <Text className="-mb-8">Lens Type</Text>
          <Text className="-mb-8">{form.getInputProps('lensType').value}</Text>
        </Group>
        <Divider my="xs" />
        <Group className="justify-between">
          <Text className="-mb-8">PD</Text>
          <Text className="-mb-8">
            {form.getInputProps('pupillaryDistance').value}
          </Text>
        </Group>
        <Divider my="xs" />
        <Group className="justify-between">
          <Text className="-mb-8">Heights</Text>
          <Text className="-mb-8">{form.getInputProps('school').heights}</Text>
        </Group>
        <Divider my="xs" />
        <Group className="justify-between">
          <Text className="-mb-8">Spectacles notes</Text>
          <Text className="-mb-8">
            {form.getInputProps('Spectacles Notes').value}
          </Text>
        </Group>
        <Divider my="xs" />
        <Title order={3}>Dispensing Status</Title>
        <Checkbox.Group
          className="justify-items-stretch"
          size="md"
          spacing="xl"
        >
          <Checkbox value="ordered" label="Ordered" />
          <Checkbox value="received" label="Received" />
          <Checkbox value="dispensed" label="Dispensed" />
        </Checkbox.Group>
      </Stack>
    </ScrollArea>
  );
};
