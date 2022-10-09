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
import { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { DatePicker } from '@mantine/dates';
import { useDatabase } from '@shared';
import { ConsultDocType, PatientDocType } from 'database';
import {
  parseDateForInput,
  parseNumberForInput,
  stripUnusedFields,
} from 'database/rxdb-utils';
import { RxDocument } from 'rxdb';
import { useForm } from 'react-hook-form';
import LensTypeSelect from 'app/shared/lensType-select';

type TimestampFilter = 'spectacle.orderDate' | 'spectacle.deliveredDate';

type FormTimestamps = {
  [key in TimestampFilter]: Date | null;
};

export type FormInputType = Omit<ConsultDocType, TimestampFilter> &
  FormTimestamps;

export enum OrderStatus {
  'Created' = 'CREATED',
  'Order sent' = 'ORDERSENT',
  'Ready for delivery' = 'READYFORDELIVERY',
  'Delivered' = 'DELIVERED',
}

export const SpectaclesDetailsPage = () => {
  const { consultsCollection, patientsCollection } = useDatabase();

  const [searchParams] = useSearchParams();
  const spectaclesId = searchParams.get('spectaclesId');

  const [consult, setConsult] = useState<RxDocument<ConsultDocType> | null>();
  const [patient, setPatient] = useState<RxDocument<PatientDocType> | null>();

  useEffect(() => {
    if (spectaclesId) {
      consultsCollection
        ?.findOne({
          selector: {
            'spectacle.id': spectaclesId,
          },
        })
        .$.subscribe((consult) => setConsult(consult));
    }
  }, [spectaclesId, consultsCollection]);

  useEffect(() => {
    if (consult) {
      patientsCollection
        ?.findOne(consult.patientId)
        .$.subscribe((patient) => setPatient(patient));
    }
  }, [consult, patientsCollection]);

  const optometristDetails = {
    email: 'mobile-optometry@auckland.ac.nz',
    mobile: '027 272 3319',
  };

  const { register, getValues, setValue } = useForm();

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleUpdateConsult = async (consult: Partial<ConsultDocType>) => {
    await consultsCollection?.atomicUpsert(consult);
  };

  const handleChange = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      if (!consult) {
        return;
      }
      const newConsult = {
        ...stripUnusedFields(JSON.parse(JSON.stringify(getValues('consult')))),
        id: consult?.get('id'),
      } as PatientDocType;
      handleUpdateConsult(newConsult);
    }, 1000);
  };

  useEffect(() => {
    if (!timeoutRef.current && consult) {
      setValue('consult', consult.toMutableJSON());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [consult?.revision]);

  if (!consult) {
    return (
      <Center className="h-full">
        <Loader />
      </Center>
    );
  }

  return (
    <ScrollArea onChange={handleChange} className="h-full p-8">
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
            {consult.get('spectacle.deliverySchool')}
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
            {...register('consult.spectacle.code')}
          />
        </Group>
        <Divider my="xs" />
        <Group className="justify-between">
          <Text className="-my-8">Colour</Text>
          <TextInput
            classNames={{ root: '-my-8', input: 'text-right' }}
            {...register('consult.spectacle.colour')}
          />
        </Group>
        <Divider my="xs" />
        <Group className="justify-between">
          {' '}
          <Text className="-my-8">Lens Type</Text>
          <LensTypeSelect
            {...register('consult.spectacle.lensType')}
            onChange={(e) => {
              setValue('consult.spectacle.lensType', e ?? undefined);
              handleChange();
            }}
          />
        </Group>
        <Divider my="xs" />
        <Group className="justify-between">
          <Text className="-my-8">PD (mm)</Text>
          <NumberInput
            classNames={{ root: '-my-8', input: 'text-right pr-8' }}
            defaultValue={parseNumberForInput(
              consult.get('spectacle.pupillaryDistance')
            )}
            {...register('consult.spectacle.pupillaryDistance', {
              valueAsNumber: true,
            })}
            min={0}
            precision={2}
            step={0.1}
            max={undefined}
            onChange={(value) => {
              setValue('consult.spectacle.pupillaryDistance', value);
            }}
          />
        </Group>
        <Divider my="xs" />
        <Group className="justify-between">
          <Text className="-my-8">Heights (mm)</Text>
          <TextInput
            classNames={{ root: '-my-8', input: 'text-right' }}
            {...register('consult.spectacle.heights')}
          />
        </Group>
        <Divider my="xs" />
        <Group className="justify-between">
          <Text className="-my-8">Notes</Text>
          <Textarea
            autosize
            classNames={{ root: '-my-3', input: 'text-left py-1' }}
            defaultValue={consult.get('spectacle.notes')}
            {...register('consult.spectacle.notes')}
            minRows={1}
          />
        </Group>
        <Divider my="xs" />
        <Group className="justify-between -my-8">
          <Text className="-my-8">Order Status</Text>
          <Select
            className="w-40"
            classNames={{ root: 'w-40 -my-8', input: 'text-right' }}
            data={Array.from(
              (Object.keys(OrderStatus) as Array<keyof typeof OrderStatus>).map(
                (key) => {
                  return { value: OrderStatus[key], label: key };
                }
              )
            )}
            defaultValue={consult.get('spectacle.orderStatus')}
            {...register('consult.spectacle.orderStatus')}
            onChange={(value) => {
              setValue('consult.spectacle.orderStatus', value ?? 'CREATED');
              handleChange();
            }}
          />
        </Group>
        <Divider my="xs" />
        <Group className="justify-between">
          <Text className="-my-8">Order Date</Text>
          <DatePicker
            classNames={{ root: 'w-40 -my-8', input: 'text-right' }}
            defaultValue={parseDateForInput(consult.get('spectacle.orderDate'))}
            {...register('consult.spectacle.orderDate', {
              valueAsDate: true,
            })}
            onChange={(e) => {
              setValue('consult.spectacle.orderDate', e ?? undefined);
              handleChange();
            }}
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
            defaultValue={parseDateForInput(
              consult.get('spectacle.deliveredDate')
            )}
            {...register('consult.spectacle.deliveredDate', {
              valueAsDate: true,
            })}
            onChange={(e) => {
              setValue('consult.spectacle.deliveredDate', e ?? undefined);
              handleChange();
            }}
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
