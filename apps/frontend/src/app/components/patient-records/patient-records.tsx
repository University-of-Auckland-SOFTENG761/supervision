import { Tabs, Text } from '@mantine/core';
import { IconPill, IconReportMedical } from '@tabler/icons';
import React from 'react';

type PatientRecordsProps = {
  className?: string;
};

export const PatientRecords = (props: PatientRecordsProps) => {
  return (
    <Tabs variant="outline" defaultValue="consult" className={props.className}>
      <Tabs.List>
        <Tabs.Tab value="consult" icon={<IconReportMedical size={20} />}>
          Consult Records
        </Tabs.Tab>
        <Tabs.Tab value="dispensing" icon={<IconPill size={20} />}>
          Dispensing Records
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="consult" className="p-3">
        <Text>Consult Records Table</Text>
      </Tabs.Panel>
      <Tabs.Panel value="dispensing" className="p-3">
        <Text>Dispensing Records Table</Text>
      </Tabs.Panel>
    </Tabs>
  );
};

PatientRecords.defaultProps = {
  className: undefined,
};

export default PatientRecords;
