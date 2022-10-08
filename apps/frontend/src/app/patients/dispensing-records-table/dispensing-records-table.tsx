import React from 'react';
import { Table, TableTheme } from '@shared';
import { useNavigate } from 'react-router-dom';
import { Stack, Text, ThemeIcon } from '@mantine/core';
import { IconDatabaseOff } from '@tabler/icons';
import { applyDateFormat } from 'utils/date.utils';
import { RxDocument } from 'rxdb';
import { ConsultDocType } from 'database';

type DispensingRecordsTableProps = {
  consults: Map<string, RxDocument<ConsultDocType>> | null;
};

export const DispensingRecordsTable = ({
  consults,
}: DispensingRecordsTableProps) => {
  const navigate = useNavigate();

  const consultsArray = Array.from(consults?.values() ?? []);

  // remove items in consultsArray that have the same id
  const uniqueConsultsArray = consultsArray.filter(
    (consult, index, self) =>
      index === self.findIndex((t) => t.id === consult.id)
  );

  const dispensingRecords = uniqueConsultsArray.map((consult) => ({
    spectacles: consult.spectacle,
    rxLeft: consult.givenRefractionLeftEyeSphere,
    rxRight: consult.givenRefractionRightEyeSphere,
  }));

  const handleDispensingRecordClick = (spectaclesId: string) => {
    navigate(`/spectacles-details?spectaclesId=${spectaclesId}`);
  };

  return (
    <Table theme={TableTheme.Secondary}>
      <thead>
        <tr>
          <th>DATE</th>
          <th>RX RIGHT</th>
          <th>RX LEFT</th>
          <th>PD</th>
          <th>HEIGHTS</th>
          <th>FRAME CODE/COLOUR</th>
        </tr>
      </thead>
      <tbody>
        {dispensingRecords.length === 0 ? (
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
                <Text className="m-auto font-medium">
                  No dispensing records
                </Text>
              </Stack>
            </td>
          </tr>
        ) : (
          dispensingRecords.map((record) => (
            <tr
              key={record.spectacles?.id}
              className="cursor-pointer"
              onClick={() =>
                record.spectacles?.id &&
                handleDispensingRecordClick(record.spectacles.id)
              }
            >
              <td>
                {record.spectacles?.orderDate
                  ? applyDateFormat(new Date(record.spectacles?.orderDate))
                  : 'Not ordered yet'}
              </td>
              <td>{record.rxRight}</td>
              <td>{record.rxLeft}</td>
              <td>{record.spectacles?.pupillaryDistance}</td>
              <td>{record.spectacles?.heights}</td>
              <td>{record.spectacles?.code}</td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
};

export default DispensingRecordsTable;
