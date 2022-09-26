import { Table, TableTheme } from '@shared';
import React from 'react';

export const PatientRecordsTable = ({
  patientRecords,
}: {
  patientRecords: {
    name: string;
    dateOfBirth: Date;
    school: string;
    lastSeenBy: string;
  }[];
}) => {
  // TODO: Replace with actual data

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
