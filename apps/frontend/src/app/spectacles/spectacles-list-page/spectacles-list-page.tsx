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

export const SpectaclesListPage = () => {
  const { consults, patients } = useDatabase();
  const spectaclesRecords = consults?.map((c) => {
    const patient = patients?.find((p) => p.id === c.patientId);
    return {
      id: c.spectacle?.id,
      firstName: patient?.firstName,
      lastName: patient?.lastName,
      school: patient?.school,
      spectaclesCode: c.spectacle?.code,
      colour: c.spectacle?.colour,
      lensType: c.spectacle?.lensType,
      pupillaryDistance: c.spectacle?.pupillaryDistance,
      heights: c.spectacle?.heights,
      spectaclesNotes: c.spectacle?.notes,
      orderStatus: c.spectacle?.orderStatus,
      associatedPatientUid: c.patientId,
      orderDate: c.spectacle?.orderDate,
    };
  });

  const navigate = useNavigate();

  const [isFetching, setIsFetching] = useState(false);
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: 'date',
    direction: 'asc',
  });
  const [tableRecords, setTableRecords] = useState(
    sortBy(spectaclesRecords, 'name')
  );
  useEffect(() => {
    const data = sortBy(spectaclesRecords, sortStatus.columnAccessor);
    setTableRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
  }, [sortStatus]);
  // Search bar text query to filter results by
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebouncedValue(query, 200);
  // Select order status query to filter results by
  const [statusQuery, setStatusQuery] = useState<string | null>(null);
  const [debouncedStatusQuery] = useDebouncedValue(statusQuery, 200);

  useEffect(() => {
    spectaclesRecords &&
      setTableRecords(
        spectaclesRecords.filter(
          ({ firstName, lastName, orderDate, school, id, orderStatus }) => {
            if (
              debouncedStatusQuery !== '' &&
              debouncedStatusQuery !== null &&
              debouncedStatusQuery !== orderStatus
            ) {
              return false;
            }
            if (
              debouncedQuery !== '' &&
              !`${firstName} ${lastName} ${
                orderDate ? new Date(orderDate)?.toLocaleDateString() : null
              } ${school} ${id}`
                .toLowerCase()
                .includes(debouncedQuery.trim().toLowerCase())
            ) {
              return false;
            }
            return true;
          }
        )
      );
  }, [debouncedQuery, debouncedStatusQuery]);

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
          data={[
            { value: 'CREATED', label: 'Created' },
            { value: 'ORDERSENT', label: 'Order sent' },
            { value: 'READYFORDELIVERY', label: 'Ready for delivery' },
            { value: 'DELIVERED', label: 'Delivered' },
          ]}
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
          records={tableRecords}
          idAccessor="uid"
          columns={[
            {
              accessor: 'orderDate',
              title: 'DATE',
              render: ({ orderDate }) => dayjs(orderDate).format('DD/MM/YYYY'),
              sortable: true,
            },
            { accessor: 'id', title: 'ID#', sortable: true },
            { accessor: 'firstName', title: 'FIRST NAME', sortable: true },
            { accessor: 'lastName', title: 'LAST NAME', sortable: true },
            { accessor: 'school', title: 'SCHOOL', sortable: true },
            {
              accessor: 'orderStatus',
              title: 'ORDER STATUS',
              render: ({ orderStatus }) =>
                orderStatus &&
                orderStatus.charAt(0).toUpperCase() + orderStatus.slice(1),
              sortable: true,
            },
          ]}
          sortStatus={sortStatus}
          onSortStatusChange={setSortStatus}
          noRecordsText="No records to show"
          fetching={isFetching}
          onRowClick={(record) =>
            navigate(`/spectacles-details?spectaclesId=${record.id}`)
          }
        />
      </Stack>
    </ScrollArea>
  );
};
