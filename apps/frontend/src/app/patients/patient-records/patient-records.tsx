import { Tabs } from '@mantine/core';
import { IconEye, IconEyeglass } from '@tabler/icons';
import { ConsultDocument } from 'database/rxdb-utils';
import React from 'react';
import { ConsultRecordsTable } from '../consult-records-table';
import { DispensingRecordsTable } from '../dispensing-records-table';

type PatientRecordsProps = {
  className?: string;
  userConsults: ConsultDocument[];
};

export const PatientRecords = ({
  className,
  userConsults,
}: PatientRecordsProps) => {
  return (
    <Tabs variant="outline" defaultValue="consult" className={className}>
      <Tabs.List>
        <Tabs.Tab value="consult" icon={<IconEye size={20} />}>
          Consult Records
        </Tabs.Tab>
        <Tabs.Tab value="dispensing" icon={<IconEyeglass size={20} />}>
          Dispensing Records
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="consult" className="p-3">
        <ConsultRecordsTable userConsults={userConsults} />
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
