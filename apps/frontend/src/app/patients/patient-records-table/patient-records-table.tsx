import { Table, TableTheme } from '@shared';
import { PatientDocType } from 'database';
import { useNavigate } from 'react-router-dom';
import { RxDocument } from 'rxdb';
import { formatName } from 'utils/name.utils';

export const PatientRecordsTable = ({
  patientRecords,
  closeModal,
}: {
  patientRecords: RxDocument<PatientDocType>[];
  closeModal?: () => void;
}) => {
  const navigate = useNavigate();

  const openPatient = (patientId: string) => {
    navigate('/patient-details?patientId=' + patientId);
    closeModal?.();
  };

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
            key={record.id}
            className="cursor-pointer"
            onClick={() => openPatient(record.id)}
          >
            <td>{formatName(record.firstName, record.lastName)}</td>
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
