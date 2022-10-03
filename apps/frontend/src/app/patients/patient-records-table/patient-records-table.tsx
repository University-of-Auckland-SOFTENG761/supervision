import { Table, TableTheme } from '@shared';
import { PatientDocument } from 'database/rxdb-utils';

export const PatientRecordsTable = ({
  patientRecords,
}: {
  patientRecords: PatientDocument[];
}) => {
  return (
    <Table theme={TableTheme.Primary}>
      <thead>
        <tr>
          <th>NAME</th>
          <th>DATE OF BIRTH</th>
          <th>SCHOOL</th>
        </tr>
      </thead>
      <tbody>
        {patientRecords.map((record) => (
          <tr key={record.id}>
            <td>
              {record.firstName} {record.lastName}
            </td>
            <td>
              {record.dateOfBirth
                ? new Date(record.dateOfBirth).toLocaleDateString()
                : undefined}
            </td>
            <td>{record.school}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PatientRecordsTable;
