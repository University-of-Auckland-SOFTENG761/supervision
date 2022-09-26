import { Tabs } from '@mantine/core';
import { IconEye, IconEyeglass } from '@tabler/icons';
import { ConsultDocument } from 'database/rxdb-utils';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { ConsultRecordsTable } from '../consult-records-table';
import { DispensingRecordsTable } from '../dispensing-records-table';

type PatientRecordsProps = {
  className?: string;
  patientConsults: ConsultDocument[];
};

export const PatientRecords = ({
  className,
  patientConsults,
}: PatientRecordsProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const patientRecordsTab = searchParams.get('patientRecordsTab') ?? 'consult';

  const handleTabChange = (value: string) => {
    searchParams.set('patientRecordsTab', value);
    setSearchParams(searchParams);
  };

  return (
    <Tabs
      variant="outline"
      value={patientRecordsTab}
      onTabChange={handleTabChange}
      className={className}
    >
      <Tabs.List>
        <Tabs.Tab value="consult" icon={<IconEye size={20} />}>
          Consult Records
        </Tabs.Tab>
        <Tabs.Tab value="dispensing" icon={<IconEyeglass size={20} />}>
          Dispensing Records
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="consult" className="p-3">
        <ConsultRecordsTable patientConsults={patientConsults} />
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
