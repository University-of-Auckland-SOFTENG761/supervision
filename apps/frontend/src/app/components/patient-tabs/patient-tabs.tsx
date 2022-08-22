import React, { useState } from 'react';
import { ActionIcon, Group, Tabs } from '@mantine/core';
import { IconMenu2, IconPlus } from '@tabler/icons';
import { IPatient } from '@pages';

type PatientTabsProps = {
  patients: IPatient[];
  onPatientChange: (patientUID: string) => void;
};

export const PatientTabs = (props: PatientTabsProps) => {
  const [activeTab, setActiveTab] = useState<string>(props.patients[0].uid);

  const handleTabChange = (patientUID: string) => {
    setActiveTab(patientUID);
    props.onPatientChange(patientUID);
  };

  return (
    <Group className="px-4 py-1 m-0 bg-white border-b border-black">
      <ActionIcon color="dark.2 " variant="subtle" className="p-1">
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
          {props.patients.map((patient) => (
            <Tabs.Tab key={'patient-' + patient.uid} value={patient.uid}>
              {patient.firstName + ' ' + patient.lastName}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>
    </Group>
  );
};

export default PatientTabs;
