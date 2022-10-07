import { Stack, Text, ThemeIcon } from '@mantine/core';
import { Table, TableTheme } from '@shared';
import { IconDatabaseOff } from '@tabler/icons';
import { ConsultDocument } from 'database/rxdb-utils';
import React from 'react';
import { applyDateFormat } from 'utils/date.utils';

type RecallsTableProps = {
  patientConsults: ConsultDocument[];
};

export const RecallsTable = ({ patientConsults }: RecallsTableProps) => {
  return (
    <Stack>
      <Text className="-mb-3 text-sm">Recalls</Text>
      <Table theme={TableTheme.Primary}>
        <thead>
          <tr>
            <th>RECALL DATE</th>
            <th>DESCRIPTION</th>
          </tr>
        </thead>
        <tbody>
          {patientConsults.some((consult) => consult.recallDate) ? (
            patientConsults?.map((record) =>
              record.recallDate ? (
                <tr key={record.id}>
                  <td>
                    {record.recallDate &&
                      applyDateFormat(new Date(record.recallDate))}
                  </td>
                  <td>{record.recallDescription}</td>
                </tr>
              ) : null
            )
          ) : (
            <tr>
              <td colSpan={5} className="hover:bg-white">
                <Stack className="justify-center w-full p-2">
                  <ThemeIcon
                    color="gray.6"
                    variant="light"
                    size="xl"
                    radius="xl"
                    className="m-auto"
                  >
                    <IconDatabaseOff />
                  </ThemeIcon>
                  <Text className="m-auto font-medium">No recalls</Text>
                </Stack>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Stack>
  );
};

export default RecallsTable;
