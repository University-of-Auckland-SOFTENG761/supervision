import React from 'react';
import { Table } from '@mantine/core';

export const DispensingRecordsTable = () => {
  // TODO: Replace with actual data
  const dispensingRecords = [
    {
      date: '21/08/2022',
      rxRight: '+4.00/-3.00x180',
      rxLeft: '+4.00/-3.00x180',
      pd: '62',
      heights: '64mm',
      frameCode: '67925/Pink',
    },
    {
      date: '18/02/2019',
      rxRight: '+4.00/-3.00x180',
      rxLeft: '+4.00/-3.00x180',
      pd: '62',
      heights: '64mm',
      frameCode: '39456/Blue',
    },
  ];

  return (
    <Table>
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
        {dispensingRecords.map((record) => (
          <tr key={record.date}>
            <td>{record.date}</td>
            <td>{record.rxRight}</td>
            <td>{record.rxLeft}</td>
            <td>{record.pd}</td>
            <td>{record.heights}</td>
            <td>{record.frameCode}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DispensingRecordsTable;
