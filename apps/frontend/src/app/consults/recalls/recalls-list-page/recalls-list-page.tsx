import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScrollArea, Stack, Title, TextInput, Select } from '@mantine/core';
import dayjs from 'dayjs';
import { IconSearch } from '@tabler/icons';
import { useDebouncedValue } from '@mantine/hooks';
import sortBy from 'lodash/sortBy';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useDatabase } from '@shared';
import { ConsultDocType, PatientDocType } from '../../../../database';
import { RxDocument } from 'rxdb';
import { OrderStatus } from '../../../spectacles/spectacles-details-page';
import styles from '../../../spectacles/spectacles-list-page/spectacles-list.module.scss';
import { DatePicker } from '@mantine/dates';

type RecordType = Partial<ConsultDocType> & Partial<PatientDocType>;

export const RecallsListPage = () => {
  const { consultsCollection, patientsCollection } = useDatabase();
  const navigate = useNavigate();

  const [matchingConsults, setMatchingConsults] = useState<
    RxDocument<ConsultDocType>[]
  >([]);
  const [matchingPatients, setMatchingPatients] = useState<
    RxDocument<PatientDocType>[]
  >([]);
  const [recallRecords, setRecallRecords] = useState<RecordType[]>();
  const [tableRecords, setTableRecords] = useState(
    sortBy(recallRecords, 'name')
  );
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: 'recallDate',
    direction: 'asc',
  });

  // Search bar text query to filter results by
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebouncedValue(query.trim(), 200);
  // Select order status query to filter results by
  const [dateQuery, setDateQuery] = useState<Date | null>(null);
  const [debouncedDateQuery] = useDebouncedValue(dateQuery, 200);

  useEffect(() => {
    const data = sortBy(recallRecords, sortStatus.columnAccessor);
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
                    {
                      school: {
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
        .exec()
        .then((patients) => {
          setMatchingPatients((p) => [...p, ...patients]);
          patients.forEach((patient) => {
            consultsCollection
              .find({
                selector: {
                  patientId: patient.id,
                },
              })
              .exec()
              .then((newConsults) => {
                const newConsultsArray = Array.from(newConsults.values());
                newConsults &&
                  setMatchingConsults((c) => [...c, ...newConsultsArray]);
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
        .reduce((a: RecordType[], p) => {
          const consults = matchingConsults.filter((c) => c.patientId === p.id);
          return [
            ...a,
            ...consults.map((c) => ({
              id: c?.spectacle?.id,
              recallDate: c?.recallDate,
              recallDescription: c?.recallDescription,
              firstName: p.firstName,
              lastName: p.lastName,
              school: p.school,
              patientId: c?.patientId,
            })),
          ];
        }, [])
        .filter((r) => r.recallDate)
        .filter((r) =>
          debouncedDateQuery
            ? dayjs(r.recallDate).isBefore(debouncedDateQuery)
            : true
        )
        .filter((r, i, a) => a.findIndex((t) => t.id === r.id) === i && r.id);
      setRecallRecords(records);
      setTableRecords(sortBy(records, 'recallDate'));
    }
  }, [matchingPatients, matchingConsults, debouncedDateQuery]);

  return (
    <ScrollArea className="h-full p-8">
      <Stack className={'w-4/5 mx-auto min-h-fit print:w-fit'}>
        <Title order={3}>Recall Records</Title>
        <TextInput
          className="print:hidden"
          placeholder="Search recalls..."
          icon={<IconSearch size={16} />}
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
        />
        <DatePicker
          allowFreeInput
          className="w-fit print:hidden"
          inputFormat="DD/MM/YYYY"
          dateParser={(date: string) =>
            dayjs(date, ['DD/MM/YYYY', 'DD/MM/YY']).toDate()
          }
          placeholder="Find all prior to date..."
          initialMonth={dayjs().add(12, 'month').toDate()}
          value={dateQuery}
          onChange={setDateQuery}
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
              accessor: 'recallDate',
              title: 'DATE',
              render: ({ recallDate }) => {
                return dayjs(recallDate).format('DD/MM/YYYY');
              },
              sortable: true,
            },
            { accessor: 'firstName', title: 'FIRST NAME', sortable: true },
            { accessor: 'lastName', title: 'LAST NAME', sortable: true },
            { accessor: 'school', title: 'SCHOOL', sortable: true },
            {
              accessor: 'recallDescription',
              title: 'DESCRIPTION',
              sortable: true,
            },
          ]}
          sortStatus={sortStatus}
          onSortStatusChange={setSortStatus}
          noRecordsText="No records to show"
          onRowClick={(record) =>
            navigate(`/patient-details?patientId=${record.patientId}`)
          }
        />
      </Stack>
    </ScrollArea>
  );
};
