import { ActionIcon, Group, Tabs } from '@mantine/core';
import { IconMenu2, IconPlus } from '@tabler/icons';
import { usePatients } from '@shared';
import { useCallback, useEffect, useMemo } from 'react';
import { IPatient } from '../patient-details-page';

type PatientTabsProps = {
  currentPatientUid?: string;
  onPatientChange: (patientUID: string) => void;
};

export const PatientTabs = ({
  currentPatientUid,
  onPatientChange,
}: PatientTabsProps) => {
  const { patients, newPatient } = usePatients();

  const handleTabChange = useCallback(
    (patientUID: string) => onPatientChange(patientUID),
    [onPatientChange]
  );

  const handleNewPatient = () => newPatient && handleTabChange(newPatient());

  useEffect(() => {
    if (patients && patients.length > 0 && !currentPatientUid) {
      handleTabChange(patients[0].id);
    }
  }, [patients, currentPatientUid, handleTabChange]);

  const patientTabs = useMemo(
    () =>
      patients?.map((patient: IPatient) => (
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
        value={currentPatientUid}
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
