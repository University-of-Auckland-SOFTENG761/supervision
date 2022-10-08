/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScrollArea, Stack, Title, TextInput, Select } from '@mantine/core';
import dayjs from 'dayjs';
import { IconSearch } from '@tabler/icons';
import { useDebouncedValue } from '@mantine/hooks';
import sortBy from 'lodash/sortBy';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useDatabase } from '@shared';
import { OrderStatus } from '../spectacles-details-page';
import styles from './spectacles-list.module.scss';
import { RxDocument } from 'rxdb';
import { ConsultDocType, PatientDocType } from 'database';

export const SpectaclesListPage = () => {
  const { consultsCollection, patientsCollection } = useDatabase();
  const navigate = useNavigate();

  const [matchingConsults, setMatchingConsults] = useState<
    RxDocument<ConsultDocType>[]
  >([]);
  const [matchingPatients, setMatchingPatients] = useState<
    RxDocument<PatientDocType>[]
  >([]);
  const [spectaclesRecords, setSpectaclesRecords] = useState<
    (Partial<PatientDocType> & {
      spectaclesCode?: string;
      colour?: string;
      lensType?: string;
      pupillaryDistance?: number;
      heights?: string;
      spectaclesNotes?: string;
      orderStatus?: string;
      associatedPatientUid?: string;
      orderDate?: string;
    })[]
  >();
  const [tableRecords, setTableRecords] = useState(
    sortBy(spectaclesRecords, 'name')
  );
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: 'date',
    direction: 'asc',
  });

  // Search bar text query to filter results by
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebouncedValue(query, 200);
  // Select order status query to filter results by
  const [statusQuery, setStatusQuery] = useState<string | null>(null);
  const [debouncedStatusQuery] = useDebouncedValue(statusQuery, 200);

  useEffect(() => {
    const data = sortBy(spectaclesRecords, sortStatus.columnAccessor);
    setTableRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
  }, [sortStatus]);

  // Find all patients and consults that could match the query
  useEffect(() => {
    if (patientsCollection && consultsCollection) {
      patientsCollection
        .find(
          debouncedQuery
            ? {
                selector: {
                  $or: [
                    {
                      firstName: {
                        $regex: new RegExp(
                          debouncedQuery
                            .trim()
                            .replace(/\s+/g, ' ')
                            .split('')
                            .join('.*'),
                          'i'
                        ),
                        $options: 'i',
                      },
                    },
                    {
                      firstName: {
                        $regex: new RegExp(
                          debouncedQuery
                            .slice(debouncedQuery.indexOf(' ') + 1)
                            .trim()
                            .replace(/\s+/g, ' ')
                            .split('')
                            .join('.*'),
                          'i'
                        ),
                        $options: 'i',
                      },
                    },
                    {
                      lastName: {
                        $regex: new RegExp(
                          debouncedQuery
                            .trim()
                            .replace(/\s+/g, ' ')
                            .split('')
                            .join('.*'),
                          'i'
                        ),
                        $options: 'i',
                      },
                    },
                    {
                      lastName: {
                        $regex: new RegExp(
                          debouncedQuery
                            .slice(debouncedQuery.indexOf(' ') + 1)
                            .trim()
                            .replace(/\s+/g, ' ')
                            .split('')
                            .join('.*'),
                          'i'
                        ),
                        $options: 'i',
                      },
                    },
                  ],
                },
                limit: 100,
              }
            : undefined
        )
        .$.subscribe((patients) => {
          setMatchingPatients((p) => [...p, ...patients]);
          patients.forEach((patient) => {
            consultsCollection
              .findByIds(patient.consultIds ?? [])
              .then((newConsults) => {
                const newConsultsArray = Array.from(newConsults.values());
                newConsults &&
                  setMatchingConsults((c) => [...c, ...newConsultsArray]);
              });
          });
        });
      consultsCollection
        .find(
          debouncedQuery
            ? {
                selector: {
                  $or: [
                    {
                      'spectacle.id': {
                        $regex: new RegExp(
                          debouncedQuery
                            .trim()
                            .replace(/\s+/g, ' ')
                            .split('')
                            .join('.*'),
                          'i'
                        ),
                        $options: 'i',
                      },
                    },
                  ],
                },
                limit: 100,
              }
            : undefined
        )
        .$.subscribe((consults) => {
          setMatchingConsults((c) => [...c, ...consults]);
          consults.forEach((consult) => {
            patientsCollection
              .findOne(consult.patientId)
              .exec()
              .then((patient) => {
                patient && setMatchingPatients((prev) => [...prev, patient]);
              });
          });
        });
    }
  }, [debouncedQuery, patientsCollection, consultsCollection]);

  useEffect(() => {
    setMatchingPatients([]);
    setMatchingConsults([]);
  }, [debouncedQuery]);

  // Combine the matching patients and consults into a single array of records
  useEffect(() => {
    if (matchingPatients && matchingConsults) {
      const records = matchingPatients
        .map((p, i) => {
          const consult = matchingConsults.find((c) => c.patientId === p.id);
          return {
            id: consult?.spectacle?.id,
            firstName: p.firstName,
            lastName: p.lastName,
            school: consult?.spectacle?.deliverySchool,
            spectaclesCode: consult?.spectacle?.code,
            colour: consult?.spectacle?.colour,
            lensType: consult?.spectacle?.lensType,
            pupillaryDistance: consult?.spectacle?.pupillaryDistance,
            heights: consult?.spectacle?.heights,
            spectaclesNotes: consult?.spectacle?.notes,
            orderStatus: consult?.spectacle?.orderStatus,
            associatedPatientUid: consult?.spectacle?.patientId,
            orderDate: consult?.spectacle?.orderDate,
          };
        })
        .filter((r) =>
          debouncedStatusQuery ? r.orderStatus === debouncedStatusQuery : true
        )
        .filter((r, i, a) => a.findIndex((t) => t.id === r.id) === i && r.id);
      setSpectaclesRecords(records);
      setTableRecords(sortBy(records, 'date'));
    }
  }, [matchingPatients, matchingConsults, debouncedStatusQuery]);

  const orderStatusArray = Array.from(
    (Object.keys(OrderStatus) as Array<keyof typeof OrderStatus>).map((key) => {
      return { key, value: OrderStatus[key] };
    })
  );

  return (
    <ScrollArea className="h-full p-8">
      <Stack className={'w-4/5 mx-auto min-h-fit'}>
        <Title order={3}>Spectacles Dispensing Records</Title>
        <TextInput
          placeholder="Search dispensing records..."
          icon={<IconSearch size={16} />}
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
        />
        <Select
          label="Select one to filter by"
          className="w-48"
          value={statusQuery}
          onChange={setStatusQuery}
          placeholder="Order Status"
          clearable
          data={Array.from(
            (Object.keys(OrderStatus) as Array<keyof typeof OrderStatus>).map(
              (key) => {
                return { value: OrderStatus[key], label: key };
              }
            )
          )}
        />
        <DataTable
          sx={
            tableRecords.length === 0
              ? { height: 200 }
              : { height: 'fit-content' }
          }
          withBorder
          withColumnBorders
          borderRadius="md"
          striped
          highlightOnHover
          className="min-h-full"
          classNames={{ header: `${styles['datatable-custom-header']}` }}
          records={tableRecords}
          idAccessor="id"
          columns={[
            {
              accessor: 'orderDate',
              title: 'DATE',
              render: ({ orderDate }) => {
                return orderDate
                  ? dayjs(orderDate).format('DD/MM/YYYY')
                  : 'Not ordered yet';
              },
              sortable: true,
            },
            { accessor: 'id', title: 'ID#', sortable: true },
            { accessor: 'firstName', title: 'FIRST NAME', sortable: true },
            { accessor: 'lastName', title: 'LAST NAME', sortable: true },
            { accessor: 'school', title: 'SCHOOL', sortable: true },
            {
              accessor: 'orderStatus',
              title: 'ORDER STATUS',
              render: ({ orderStatus }) => {
                const orderStatusKey = orderStatusArray?.find(
                  ({ key, value }) => value === orderStatus
                )?.key;
                return orderStatusKey;
              },
              sortable: true,
            },
          ]}
          sortStatus={sortStatus}
          onSortStatusChange={setSortStatus}
          noRecordsText="No records to show"
          onRowClick={(record) =>
            navigate(`/spectacles-details?spectaclesId=${record.id}`)
          }
        />
      </Stack>
    </ScrollArea>
  );
};
