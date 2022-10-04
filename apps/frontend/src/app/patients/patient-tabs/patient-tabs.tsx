import { ActionIcon, Group, Tabs } from '@mantine/core';
import { IconMenu2, IconPlus } from '@tabler/icons';
import { useDatabase } from '@shared';
import { useCallback, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PatientDocument } from 'database/rxdb-utils';

export const PatientTabs = () => {
  const { patients, newPatient } = useDatabase();
  const [searchParams, setSearchParams] = useSearchParams();
  const patientId = searchParams.get('patientId');

  const handleTabChange = useCallback(
    (newPatientId: string) => setSearchParams({ patientId: newPatientId }),
    [setSearchParams]
  );

  const handleNewPatient = () => newPatient && handleTabChange(newPatient());

  useEffect(() => {
    if (patients && patients.length > 0 && !patientId) {
      handleTabChange(patients[0].id);
    }
  }, [patients, patientId, handleTabChange]);

  const patientTabs = useMemo(
    () =>
      patients?.map((patient: PatientDocument) => (
        <Tabs.Tab key={'patient-' + patient.id} value={patient.id}>
          {!patient.firstName && !patient.lastName
            ? 'New Patient'
            : patient.firstName + ' ' + patient.lastName}
        </Tabs.Tab>
      )),
    [patients]
  );

  return (
    <Group className="px-4 py-1 m-0 bg-white border-0 border-b-[1px] border-solid border-gray-200">
      <ActionIcon
        color="dark.2 "
        variant="subtle"
        className="p-1"
        onClick={() => handleNewPatient()}
      >
        <IconPlus size={24} />
      </ActionIcon>
      <ActionIcon color="dark.2" variant="subtle" className="p-1">
        <IconMenu2 size={24} />
      </ActionIcon>
      <Tabs
        variant="pills"
        color="blue"
        value={patientId}
        onTabChange={handleTabChange}
        classNames={{
          root: 'grow',
          tab: 'font-semibold',
        }}
        styles={(theme) => ({
          tab: { color: theme.colors.blue[5] },
        })}
      >
        <Tabs.List>{patientTabs}</Tabs.List>
      </Tabs>
    </Group>
  );
};

export default PatientTabs;
