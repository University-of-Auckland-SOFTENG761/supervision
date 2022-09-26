import { Table, TableTheme } from '@shared';
import { ConsultDocument } from 'database/rxdb-utils';
import React from 'react';
import dayjs from 'dayjs';
import { Text } from '@mantine/core';

type ConsultRecordsTableProps = {
  patientConsults: ConsultDocument[];
};

export const ConsultRecordsTable = ({
  patientConsults,
}: ConsultRecordsTableProps) => {
  const applyRefractionFormat = (
    eyeSphere?: number,
    eyeCylinder?: number,
    axis?: number
  ) =>
    `${eyeSphere?.toFixed(2) ?? '-.--'} / ${
      eyeCylinder?.toFixed(2) ?? '-.--'
    } x ${axis ?? '--'}`;

  const applyDateFormat = (date?: Date) => dayjs(date).format('DD/MM/YYYY');

  if (patientConsults.length === 0) {
    return <Text className="text-sm">No consult records yet!</Text>;
  } else {
    return (
      <Table theme={TableTheme.Primary}>
        <thead>
          <tr>
            <th>DATE SEEN</th>
            <th>RX RIGHT</th>
            <th>RX LEFT</th>
            <th>DIAGNOSIS</th>
            <th>MANAGEMENT</th>
          </tr>
        </thead>
        <tbody>
          {patientConsults?.map((record) => (
            <tr key={record.id}>
              <td>{applyDateFormat(new Date(record.dateConsentGiven))}</td>
              <td>
                {applyRefractionFormat(
                  record.givenRefractionRightEyeSphere,
                  record.givenRefractionRightCylinder,
                  record.givenRefractionRightAxis
                )}
              </td>
              <td>
                {applyRefractionFormat(
                  record.givenRefractionLeftEyeSphere,
                  record.givenRefractionLeftCylinder,
                  record.givenRefractionLeftAxis
                )}
              </td>
              <td>{record.diagnosis}</td>
              <td>{record.management}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
};

export default ConsultRecordsTable;
