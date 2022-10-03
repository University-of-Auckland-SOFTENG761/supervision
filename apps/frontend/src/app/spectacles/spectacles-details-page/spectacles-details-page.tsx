import { useForm } from '@mantine/form';
import {
  Divider,
  Group,
  ScrollArea,
  Select,
  Stack,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { useParams } from 'react-router-dom';
import { Text } from '@mantine/core';
import React, { useCallback, useEffect } from 'react';
import dayjs from 'dayjs';
import { DatePicker } from '@mantine/dates';

export type ISpectacles = {
  uid: string;
  firstName?: string;
  lastName: string;
  school: string;
  spectaclesCode?: string;
  colour?: string;
  lensType?: string;
  pupillaryDistance?: number;
  heights?: number;
  spectaclesNotes?: string;
  orderStatus?: string;
  orderDate?: Date;
  deliveryDate?: Date;
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
      spectaclesCode: 'some-spec-code',
      colour: 'Black',
      lensType: 'some-lens-type',
      pupillaryDistance: 120.5,
      heights: 29.5,
      spectaclesNotes: 'Sat on his last pair',
      orderStatus: 'orderSent',
      associatedPatientUid: 'some-patient-id-123456',
    },
    {
      uid: 'fake_id_1235',
      firstName: 'Joan',
      lastName: 'Doe',
      school: 'Massey High School',
      spectaclesCode: '',
      colour: 'Blue',
      lensType: '',
      pupillaryDistance: 120,
      heights: 20.5,
      spectaclesNotes: '',
    },
    {
      uid: 'fake_id_1236',
      firstName: 'Jezza',
      lastName: 'Doe',
      school: 'Massey High School',
      spectaclesCode: '',
      colour: 'Green',
      lensType: '',
      pupillaryDistance: 120,
      heights: 42.0,
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

  const optometristDetails = {
    email: 'mobile-optometry@auckland.ac.nz',
    mobile: '027 272 3319',
  };

  return (
    <ScrollArea className="h-full p-8">
      <Stack className="w-3/5 max-w-2xl min-w-fit mx-auto flex space-y-4">
        <Title order={2} className="-mb-8">
          Vision Bus Aotearoa
        </Title>
        <Title order={2} className="-mb-8">
          Spectacles Order Form
        </Title>

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
          <Text className="-my-8">First Name</Text>
          <Text className="-my-8">{form.getInputProps('firstName').value}</Text>
        </Group>
        <Divider my="xs" />
        <Group className="justify-between">
          <Text className="-my-8">Last Name</Text>
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
          <Text className="-my-8">Spectacles ID</Text>
          <Text className="-my-8">{form.getInputProps('uid').value}</Text>
        </Group>
        <Divider my="xs" />
        <Group className="justify-between">
          <Text className="-my-8">Code</Text>
          <TextInput
            classNames={{ root: '-my-8', input: 'text-right' }}
            {...form.getInputProps('spectaclesCode')}
          />
        </Group>
        <Divider my="xs" />
        <Group className="justify-between">
          <Text className="-my-8">Colour</Text>
          <TextInput
            classNames={{ root: '-my-8', input: 'text-right' }}
            {...form.getInputProps('colour')}
          />
        </Group>
        <Divider my="xs" />
        <Group className="justify-between">
          <Text className="-my-8">Lens Type</Text>
          <TextInput
            classNames={{ root: '-my-8', input: 'text-right' }}
            {...form.getInputProps('lensType')}
          />
        </Group>
        <Divider my="xs" />
        <Group className="justify-between">
          <Text className="-my-8">PD (mm)</Text>
          <TextInput
            classNames={{ root: '-my-8', input: 'text-right' }}
            {...form.getInputProps('pupillaryDistance')}
          />
        </Group>
        <Divider my="xs" />
        <Group className="justify-between">
          <Text className="-my-8">Heights (mm)</Text>
          <TextInput
            classNames={{ root: '-my-8', input: 'text-right' }}
            {...form.getInputProps('heights')}
          />
        </Group>
        <Divider my="xs" />
        <Group className="justify-between">
          <Text className="-my-8">Notes</Text>
          <Textarea
            autosize
            minRows="1"
            classNames={{ root: '-my-3', input: 'text-left py-1' }}
            {...form.getInputProps('spectaclesNotes')}
          />
        </Group>
        <Divider my="xs" />
        <Group className="justify-between -my-8">
          <Text className="-my-8">Order Status</Text>
          <Select
            className="w-40"
            classNames={{ root: 'w-48 -my-8', input: 'text-right' }}
            data={[
              { value: 'orderSent', label: 'Ordered' },
              { value: 'readyForDelivery', label: 'Ready' },
              { value: 'deliveredToPatient', label: 'Delivered' },
            ]}
            {...form.getInputProps('orderStatus')}
          />
        </Group>
        <Divider my="xs" />
        <Group className="justify-between">
          <Text className="-my-8">Order Date</Text>
          <DatePicker
            classNames={{ root: 'w-40 -my-8', input: 'text-right' }}
            {...form.getInputProps('orderDate')}
            allowFreeInput
            inputFormat="DD/MM/YYYY"
            dateParser={(date: string) =>
              dayjs(date, ['DD/MM/YYYY', 'DD/MM/YY']).toDate()
            }
            placeholder="DD/MM/YYYY"
            initialMonth={new Date()}
          />
        </Group>
        <Divider my="xs" />
        <Group className="justify-between">
          <Text className="-my-8">Delivery Date</Text>
          <DatePicker
            classNames={{ root: 'w-40 -my-8', input: 'text-right' }}
            {...form.getInputProps('deliveredDate')}
            allowFreeInput
            inputFormat="DD/MM/YYYY"
            dateParser={(date: string) =>
              dayjs(date, ['DD/MM/YYYY', 'DD/MM/YY']).toDate()
            }
            placeholder="DD/MM/YYYY"
            initialMonth={new Date()}
          />
        </Group>
      </Stack>
    </ScrollArea>
  );
};
