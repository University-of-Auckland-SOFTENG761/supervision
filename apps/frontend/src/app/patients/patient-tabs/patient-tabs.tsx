import { useState } from 'react';
import { ActionIcon, Group, Tabs } from '@mantine/core';
import { IconMenu2, IconPlus } from '@tabler/icons';
import { IPatient } from '../patient-details-page';
import usePatients from 'app/hooks/usePatients';

type PatientTabsProps = {
  patients: IPatient[];
  onPatientChange: (patientUID: string) => void;
};

export const PatientTabs = ({ onPatientChange }: PatientTabsProps) => {
  const { patients, newPatient } = usePatients();
  const [activeTab, setActiveTab] = useState<string | undefined>(
    patients[0]?.uid
  );

  const handleTabChange = (patientUID: string) => {
    setActiveTab(patientUID);
    onPatientChange(patientUID);
  };

  return (
    <Group className="px-4 py-1 m-0 bg-white border-0 border-b-[1px] border-solid border-gray-200">
      <ActionIcon
        color="dark.2 "
        variant="subtle"
        className="p-1"
        onClick={() => newPatient()}
      >
        <IconPlus size={24} />
      </ActionIcon>
      <ActionIcon color="dark.2" variant="subtle" className="p-1">
        <IconMenu2 size={24} />
      </ActionIcon>
      <Tabs
        variant="pills"
        color="blue"
        value={activeTab}
        onTabChange={handleTabChange}
        classNames={{
          root: 'grow',
          tab: 'font-semibold',
        }}
        styles={(theme) => ({
          tab: { color: theme.colors.blue[5] },
        })}
      >
        <Tabs.List>
          {patients.map((patient) => (
            <Tabs.Tab key={'patient-' + patient.uid} value={patient.uid}>
              {!patient.firstName && !patient.lastName
                ? 'New Patient'
                : patient.firstName + ' ' + patient.lastName}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>
    </Group>
  );
};

export default PatientTabs;
