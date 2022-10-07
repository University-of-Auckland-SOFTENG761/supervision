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

export const RecallsListPage = () => {
  const { consults } = useDatabase();

  const navigate = useNavigate();

  const [isFetching] = useState(false);
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: 'date',
    direction: 'asc',
  });
  const [tableRecords, setTableRecords] = useState(
    sortBy(consults, 'recallDate')
  );
  useEffect(() => {
    const data = sortBy(consults, sortStatus.columnAccessor);
    setTableRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
  }, [sortStatus]);
  // Search bar text query to filter results by
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebouncedValue(query, 200);
  // Select order status query to filter results by
  const [statusQuery, setStatusQuery] = useState<string | null>(null);
  const [debouncedStatusQuery] = useDebouncedValue(statusQuery, 200);

  useEffect(() => {
    setTableRecords(
      (consults ?? []).filter(({ recallDate, recallDescription }) => {
        if (debouncedStatusQuery !== '' && debouncedStatusQuery !== null) {
          return false;
        }
        if (
          debouncedQuery !== '' &&
          !`$${recallDate} ${recallDescription}`
            .toLowerCase()
            .includes(debouncedQuery.trim().toLowerCase())
        ) {
          return false;
        }
        return true;
      })
    );
  }, [debouncedQuery, debouncedStatusQuery]);

  return (
    <ScrollArea className="h-full p-8">
      <Stack className={'w-4/5 mx-auto min-h-fit'}>
        <Title order={3}>Recall Records</Title>
        <TextInput
          placeholder="Search dispensing records..."
          icon={<IconSearch size={16} />}
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
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
              accessor: 'recallDate',
              title: 'DATE',
              render: ({ recallDate }) =>
                dayjs(recallDate).format('DD/MM/YYYY'),
              sortable: true,
            },
            { accessor: 'recallDescription', title: 'REASON', sortable: true },
          ]}
          sortStatus={sortStatus}
          onSortStatusChange={setSortStatus}
          noRecordsText="No records to show"
          fetching={isFetching}
          // onRowClick={(record) => navigate(`/spectacles-details/${record.uid}`)}
        />
      </Stack>
    </ScrollArea>
  );
};
