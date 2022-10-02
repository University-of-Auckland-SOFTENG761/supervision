import { useForm } from '@mantine/form';
import {
  Divider,
  Group,
  ScrollArea,
  Select,
  Stack,
  Title,
} from '@mantine/core';
import { useParams } from 'react-router-dom';
import { Text } from '@mantine/core';
import React, { useCallback, useEffect } from 'react';
import dayjs from 'dayjs';

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
  orderStatus?: string;
  associatedPatientUid?: string;
};

export const SpectaclesDetailsPage = () => {
  // Fake data to match the records in spectacles-list-page
  // TODO: replace with backend data
  const spectacleRecords: ISpectacles[] = [
    {
      uid: 'fake_id_1234',
      firstName: 'Henry',
      lastName: 'Mitchell-Hibbert',
      school: 'University of Auckland',
      date: new Date(2022, 8, 22),
      spectaclesCode: 'some-spec-code',
      colour: 'Black',
      lensType: 'some-lens-type',
      pupillaryDistance: 120,
      heights: '29',
      spectaclesNotes: 'Sat on his last pair',
      orderStatus: 'orderSent',
      associatedPatientUid: 'some-patient-id-123456',
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
      orderStatus: spectacles?.orderStatus,
      associatedPatientUid: spectacles?.associatedPatientUid,
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
        <Title order={3} className={'-mb-8'}>
          Spectacles Dispensing - Vision Bus
        </Title>
        <Title order={3} className={'-mb-8'}>
          {spectacles
            ? dayjs(spectacles.date).format('D MMMM YYYY')
            : undefined}
        </Title>
        <Text className={'-mt-8'}>{form.getInputProps('uid').value}</Text>

        <Title order={3}>Optometrist Contact Details</Title>
        <Divider my="xs" />
        <Group className="justify-between">
          <Text className="-my-8">Email</Text>
          <Text className="-my-8">{optometristDetails.email}</Text>
        </Group>
        <Divider my="xs" />
        <Group className="justify-between">
          <Text className="-my-8">Mobile</Text>
          <Text className="-my-8">{optometristDetails.mobile}</Text>
        </Group>
        <Divider my="xs" />

        <Title order={3}>Patient Details</Title>
        <Divider my="xs" />
        <Group className="justify-between -mb-12">
          <Text className="-my-8">Patient ID</Text>
          <Text className="-my-8">
            {form.getInputProps('associatedPatientUid').value}
          </Text>
        </Group>
        <Divider my="xs" />
        <Group className="justify-between">
          <Text className="-my-8">First name</Text>
          <Text className="-my-8">{form.getInputProps('firstName').value}</Text>
        </Group>
        <Divider my="xs" />
        <Group className="justify-between">
          <Text className="-my-8">Last name</Text>
          <Text className="-my-8">{form.getInputProps('lastName').value}</Text>
        </Group>
        <Divider my="xs" />
        <Group className="justify-between">
          <Text className="-my-8">School</Text>
          <Text className="-my-8">{form.getInputProps('school').value}</Text>
        </Group>
        <Divider my="xs" />

        <Title order={3}>Spectacles Details</Title>
        <Divider my="xs" />
        <Group className="justify-between">
          <Text className="-my-8">Spectacles code</Text>
          <Text className="-my-8">
            {form.getInputProps('spectaclesCode').value}
          </Text>
        </Group>
        <Divider my="xs" />
        <Group className="justify-between">
          <Text className="-my-8">Colour</Text>
          <Text className="-my-8">{form.getInputProps('colour').value}</Text>
        </Group>
        <Divider my="xs" />
        <Group className="justify-between">
          <Text className="-my-8">Lens Type</Text>
          <Text className="-my-8">{form.getInputProps('lensType').value}</Text>
        </Group>
        <Divider my="xs" />
        <Group className="justify-between">
          <Text className="-my-8">PD</Text>
          <Text className="-my-8">
            {form.getInputProps('pupillaryDistance').value + ' mm'}
          </Text>
        </Group>
        <Divider my="xs" />
        <Group className="justify-between">
          <Text className="-my-8">Heights</Text>
          <Text className="-my-8">{form.getInputProps('heights').value}</Text>
        </Group>
        <Divider my="xs" />
        <Group className="justify-between">
          <Text className="-my-8">Spectacles notes</Text>
          <Text className="-my-8">
            {form.getInputProps('spectaclesNotes').value}
          </Text>
        </Group>
        <Divider my="xs" />
        <Group className="justify-between">
          <Text className="-my-8">Order status</Text>
          <Select
            data={[
              { value: 'orderSent', label: 'Ordered' },
              { value: 'readyForDelivery', label: 'Ready' },
              { value: 'deliveredToPatient', label: 'Delivered' },
            ]}
            {...form.getInputProps('orderStatus')}
          />
        </Group>
      </Stack>
    </ScrollArea>
  );
};
