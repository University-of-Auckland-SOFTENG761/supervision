import { Table, TableTheme, useDatabase } from '@shared';
import { ConsultDocument } from 'database/rxdb-utils';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';

export const ConsultRecordsTable = () => {
  const { consults } = useDatabase();
  const [searchParams] = useSearchParams();
  const patientId = searchParams.get('patientId');
  const [userConsults, setUserConsults] = useState<ConsultDocument[]>([]);
  console.log('user consults: ', userConsults);

  useEffect(() => {
    if (!consults || !patientId) return;
    setUserConsults(
      consults.filter((consult) => consult.patientId === patientId) ?? []
    );
  }, [patientId, consults]);

  const applyRefractionFormat = (
    eyeSphere?: number,
    eyeCylinder?: number,
    axis?: number
  ) =>
    `${eyeSphere?.toFixed(2) ?? '-.--'} / ${
      eyeCylinder?.toFixed(2) ?? '-.--'
    } x ${axis ?? '--'}`;

  const applyDateFormat = (date?: Date) => dayjs(date).format('DD/MM/YYYY');

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
        {userConsults?.map((record) => (
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
};

export default ConsultRecordsTable;
