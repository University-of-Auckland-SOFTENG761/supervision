import { Tabs } from '@mantine/core';
import { IconEye, IconEyeglass } from '@tabler/icons';
import React from 'react';
import { ConsultRecordsTable } from '../consult-records-table';
import { DispensingRecordsTable } from '../dispensing-records-table';

type PatientRecordsProps = {
  className?: string;
};
export const PatientRecords = (props: PatientRecordsProps) => {
  return (
    <Tabs variant="outline" defaultValue="consult" className={props.className}>
      <Tabs.List>
        <Tabs.Tab value="consult" icon={<IconEye size={20} />}>
          Consult Records
        </Tabs.Tab>
        <Tabs.Tab value="dispensing" icon={<IconEyeglass size={20} />}>
          Dispensing Records
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="consult" className="p-3">
        <ConsultRecordsTable />
      </Tabs.Panel>
      <Tabs.Panel value="dispensing" className="p-3">
        <DispensingRecordsTable />
      </Tabs.Panel>
    </Tabs>
  );
};

PatientRecords.defaultProps = {
  className: undefined,
};

export default PatientRecords;
