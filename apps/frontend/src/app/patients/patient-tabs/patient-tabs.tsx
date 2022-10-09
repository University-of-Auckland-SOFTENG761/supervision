import { ActionIcon, Group, Tabs } from '@mantine/core';
import { IconPlus, IconX } from '@tabler/icons';
import { useDatabase } from '@shared';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RxDocument } from 'rxdb';
import { PatientDocType } from 'database';
import { formatName } from 'utils/name.utils';
import { filterDuplicates } from 'utils/misc.utils';

export const PatientTabs = () => {
  const { patientsCollection, newPatient } = useDatabase();
  const [searchParams, setSearchParams] = useSearchParams();
  const patientId = searchParams.get('patientId');
  const [patientTabs, setPatientTabs] = useState<string[]>(
    localStorage.getItem('openTabs')?.split(',') ?? []
  );
  const [openPatients, setOpenPatients] = useState(
    new Map<string, RxDocument<PatientDocType>>()
  );

  const handleTabChange = useCallback(
    (newPatientId: string) => {
      setSearchParams({ patientId: newPatientId });
      if (!patientTabs.includes(newPatientId)) {
        setPatientTabs((t) => [...t, newPatientId]);
      }
    },
    [patientTabs, setSearchParams]
  );

  const handleNewPatient = () => newPatient && handleTabChange(newPatient());

  const handleCloseTab = (event: React.MouseEvent, tab: string) => {
    // stop event from bubbling up to tab
    event.stopPropagation();
    setPatientTabs((t) => t.filter((t) => t !== tab));
    if (tab === patientId) {
      if (patientTabs.length > 1) {
        setSearchParams({ patientId: patientTabs[0] });
      } else {
        setSearchParams({});
      }
    }
  };

  useEffect(() => {
    if (patientId && !patientTabs.includes(patientId)) {
      setPatientTabs((tabs) => [...tabs, patientId]);
    }
    if (!patientId && patientTabs.length > 0) {
      handleTabChange(patientTabs[0]);
    }
  }, [patientId, patientTabs, handleTabChange]);

  useEffect(() => {
    localStorage.setItem(
      'openTabs',
      filterDuplicates(patientTabs.filter((t) => t)).join(',')
    );
    if (patientsCollection && patientTabs.length > 0) {
      patientsCollection?.findByIds$(patientTabs).subscribe((p) => {
        if (p) {
          setOpenPatients(p);
        }
      });
    }
  }, [patientTabs, patientsCollection, setOpenPatients]);

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
        <Tabs.List>
          {filterDuplicates(patientTabs)?.map(
            (tab) =>
              tab && (
                <Tabs.Tab
                  key={tab}
                  value={tab}
                  rightSection={
                    <IconX
                      onClick={(e: React.MouseEvent) => handleCloseTab(e, tab)}
                      size={12}
                    />
                  }
                >
                  {formatName(
                    openPatients.get(tab)?.firstName,
                    openPatients.get(tab)?.lastName
                  )}
                </Tabs.Tab>
              )
          )}
        </Tabs.List>
      </Tabs>
    </Group>
  );
};

export default PatientTabs;
