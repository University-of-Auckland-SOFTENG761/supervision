import { Stack, Text } from '@mantine/core';
import { Table, TableTheme } from '@shared';
import { ConsultDocument } from 'database/rxdb-utils';
import dayjs from 'dayjs';
import React from 'react';

type RecallsTableProps = {
  userConsults: ConsultDocument[];
};

export const RecallsTable = ({ userConsults }: RecallsTableProps) => {
  const applyDateFormat = (date?: Date) => dayjs(date).format('DD/MM/YYYY');

  return (
    <Stack>
      <Text className="-mb-3 text-sm">Recalls</Text>
      {userConsults.every((consult) => consult.recallDate) ? (
        <Table striped theme={TableTheme.Primary}>
          <thead>
            <tr>
              <th>RECALL DATE</th>
              <th>DESCRIPTION</th>
            </tr>
          </thead>
          <tbody>
            {userConsults?.map((record) => (
              <tr key={record.id}>
                <td>
                  {record.recallDate &&
                    applyDateFormat(new Date(record.recallDate))}
                </td>
                <td>{record.recallDescription}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Text className="text-sm">No recalls yet!</Text>
      )}
    </Stack>
  );
};

export default RecallsTable;
