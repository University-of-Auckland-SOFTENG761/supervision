import { useForm } from '@mantine/form';
import {
  Center,
  Divider,
  Group,
  Loader,
  NumberInput,
  ScrollArea,
  Select,
  Stack,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { useSearchParams } from 'react-router-dom';
import { Text } from '@mantine/core';
import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import { DatePicker } from '@mantine/dates';
import { useDatabase } from '@shared';
import { useDebouncedValue } from '@mantine/hooks';
import { ConsultDocType } from 'database';
import { stripUnusedFields } from 'database/rxdb-utils';

type TimestampFilter = 'spectacle.orderDate' | 'spectacle.deliveredDate';

type FormTimestamps = {
  [key in TimestampFilter]: Date | null;
};

export type FormInputType = Omit<ConsultDocType, TimestampFilter> &
  FormTimestamps;

export const SpectaclesDetailsPage = () => {
  const { consults, patients, updateConsult } = useDatabase();

  const [searchParams] = useSearchParams();
  const spectaclesId = searchParams.get('spectaclesId');

  const consult = spectaclesId
    ? consults?.find((c) => c.spectacle?.id === spectaclesId)
    : undefined;
  const patient = consult?.patientId
    ? patients?.find((p) => p.id === consult?.patientId)
    : undefined;

  const buildFormValues = () => {
    return {
      code: consult?.spectacle?.code ?? '',
      colour: consult?.spectacle?.colour ?? '',
      lensType: consult?.spectacle?.lensType ?? '',
      pupillaryDistance: consult?.spectacle?.pupillaryDistance ?? undefined,
      heights: consult?.spectacle?.heights ?? '',
      notes: consult?.spectacle?.notes ?? '',
      deliverySchool: consult?.spectacle?.deliverySchool ?? '',
      orderStatus: consult?.spectacle?.orderStatus ?? '',
      orderDate: consult?.spectacle?.orderDate
        ? new Date(consult?.spectacle?.orderDate)
        : null,
      deliveredDate: consult?.spectacle?.deliveredDate
        ? new Date(consult?.spectacle?.deliveredDate)
        : null,
    };
  };

  const form = useForm({
    initialValues: buildFormValues(),
  });

  useEffect(() => {
    form.setValues(buildFormValues());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [consult]);

  const sendUpdate = () => {
    if (updateConsult && form.values && consult)
      updateConsult({
        ...consult,
        spectacle: {
          id: spectaclesId,
          ...stripUnusedFields(form.values),
        },
      });
  };

  const [debouncedFormValues] = useDebouncedValue(form.values, 5000);

  useEffect(() => {
    sendUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedFormValues]);

  const optometristDetails = {
    email: 'mobile-optometry@auckland.ac.nz',
    mobile: '027 272 3319',
  };

  if (!form.values || !consult)
    return (
      <Center className="h-full w-full">
        <Loader />
      </Center>
    );

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
          <Text className="-my-8">{patient?.id}</Text>
        </Group>
        <Divider my="xs" />
        <Group className="justify-between">
          <Text className="-my-8">First Name</Text>
          <Text className="-my-8">{patient?.firstName}</Text>
        </Group>
        <Divider my="xs" />
        <Group className="justify-between">
          <Text className="-my-8">Last Name</Text>
          <Text className="-my-8">{patient?.lastName}</Text>
        </Group>
        <Divider my="xs" />
        <Group className="justify-between">
          <Text className="-my-8">School</Text>
          <Text className="-my-8">
            {form.getInputProps('deliverySchool').value}
          </Text>
        </Group>
        <Divider my="xs" />
        <Title order={3}>Spectacles Details</Title>
        <Divider my="xs" />
        <Group className="justify-between">
          <Text className="-my-8">Spectacles ID</Text>
          <Text className="-my-8">{spectaclesId}</Text>
        </Group>
        <Divider my="xs" />
        <Group className="justify-between">
          <Text className="-my-8">Code</Text>
          <TextInput
            classNames={{ root: '-my-8', input: 'text-right' }}
            {...form.getInputProps('code')}
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
          <NumberInput
            classNames={{ root: '-my-8', input: 'text-right pr-8' }}
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
            {...form.getInputProps('notes')}
          />
        </Group>
        <Divider my="xs" />
        <Group className="justify-between -my-8">
          <Text className="-my-8">Order Status</Text>
          <Select
            className="w-40"
            classNames={{ root: 'w-40 -my-8', input: 'text-right' }}
            data={[
              { value: 'CREATED', label: 'Created' },
              { value: 'ORDERSENT', label: 'Order sent' },
              { value: 'READYFORDELIVERY', label: 'Ready for delivery' },
              { value: 'DELIVERED', label: 'Delivered' },
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
