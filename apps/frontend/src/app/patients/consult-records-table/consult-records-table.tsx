import { Table, TableTheme } from '@shared';
import { ConsultDocument } from 'database/rxdb-utils';
import { Stack, Text, ThemeIcon } from '@mantine/core';
import { applyDateFormat } from 'utils/date.utils';
import { useNavigate } from 'react-router-dom';
import { IconDatabaseOff } from '@tabler/icons';

type ConsultRecordsTableProps = {
  patientConsults: ConsultDocument[];
};

export const ConsultRecordsTable = ({
  patientConsults,
}: ConsultRecordsTableProps) => {
  const navigate = useNavigate();

  const applyRefractionFormat = (
    eyeSphere?: number,
    eyeCylinder?: number,
    axis?: number
  ) =>
    `${eyeSphere?.toFixed(2) ?? '-.--'} / ${
      eyeCylinder?.toFixed(2) ?? '-.--'
    } x ${axis ?? '--'}`;

  const handleConsultClick = (consultId: string) => {
    navigate(`/consult-details?consultId=${consultId}`);
  };

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
        {patientConsults.length === 0 ? (
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
                <Text className="m-auto font-medium">No consult records</Text>
              </Stack>
            </td>
          </tr>
        ) : (
          patientConsults?.map((record) => (
            <tr
              key={record.id}
              className="cursor-pointer"
              onClick={() => handleConsultClick(record.id)}
            >
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
          ))
        )}
      </tbody>
    </Table>
  );
};

export default ConsultRecordsTable;
