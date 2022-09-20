import { Table, TableTheme } from '@shared';
import React from 'react';

export const ConsultRecordsTable = () => {
  // TODO: Replace with actual data
  const consultRecords = [
    {
      date: '21/08/2022',
      rxRight: '+4.00/-3.00x180',
      rxRightEyeSphere: '+4.00',
      rxRightCylinder: '-3.00',
      rxRightAxis: '180',
      rxLeft: '+4.00/-3.00x180',
      rxLeftEyeSphere: '+4.00',
      rxLeftCylinder: '-3.00',
      rxLeftAxis: '180',
      pd: '62',
      diagnosis: 'Myopia',
      management: 'Glasses',
    },
    {
      date: '18/02/2019',
      rxRight: '+4.00/-3.00x180',
      rxRightEyeSphere: '+4.00',
      rxRightCylinder: '-3.00',
      rxRightAxis: '180',
      rxLeft: '+4.00/-3.00x180',
      rxLeftEyeSphere: '+4.00',
      rxLeftCylinder: '-3.00',
      rxLeftAxis: '180',
      pd: '62',
      diagnosis: 'Myopia',
      management: 'Contact Lenses',
    },
  ];

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
        {consultRecords.map((record) => (
          <tr key={record.date}>
            <td>{record.date}</td>
            <td>
              {record.rxRightEyeSphere +
                '/' +
                record.rxRightCylinder +
                'x' +
                record.rxRightAxis}
            </td>
            <td>
              {record.rxLeftEyeSphere +
                '/' +
                record.rxLeftCylinder +
                'x' +
                record.rxLeftAxis}
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
