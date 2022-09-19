import { Table, TableTheme } from '@shared';
import React from 'react';

export const PatientRecordsTable = () => {
  // TODO: Replace with actual data
  const patientRecords = [
    {
      name: 'Jackson Chadfield',
      dateOfBirth: new Date(2000, 11, 17),
      school: 'University of Auckland',
      lastSeenBy: 'Veeran',
    },
  ];

  return (
    <Table theme={TableTheme.Primary}>
      <thead>
        <tr>
          <th>NAME</th>
          <th>DATE OF BIRTH</th>
          <th>SCHOOL</th>
          <th>LAST SEEN BY</th>
        </tr>
      </thead>
      <tbody>
        {patientRecords.map((record) => (
          <tr key={record.name}>
            <td>{record.name}</td>
            <td>{record.dateOfBirth.toLocaleString()}</td>
            <td>{record.school}</td>
            <td>{record.lastSeenBy}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PatientRecordsTable;
