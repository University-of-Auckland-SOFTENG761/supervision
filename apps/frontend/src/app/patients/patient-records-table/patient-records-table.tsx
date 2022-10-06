import { Table, TableTheme } from '@shared';
import { PatientDocument } from 'database/rxdb-utils';
import { useNavigate } from 'react-router-dom';

export const PatientRecordsTable = ({
  patientRecords,
  onPatientSelected,
}: {
  patientRecords: PatientDocument[];
  onPatientSelected?: (patient: PatientDocument) => void;
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
          <tr
            className="cursor-pointer"
            key={record.id}
            onClick={() => {
              if (onPatientSelected) onPatientSelected(record);
            }}
          >
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
