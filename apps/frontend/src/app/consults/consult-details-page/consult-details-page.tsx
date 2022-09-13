import React from 'react';
import { ScrollArea, SimpleGrid, Tabs } from '@mantine/core';
import {
  IconEyeglass,
  IconReportMedical,
  IconStethoscope,
} from '@tabler/icons';
import { ConsultNotesTable } from '../consult-notes-table';
import { SpectacleDetailsTable } from '../spectacle-details-table';
import { GeneralInfoTable } from '../general-info-table';

export type IConsult = {
  uid: string;
};

export const ConsultDetailsPage = () => {
  return (
    <Tabs variant="outline" defaultValue="consult" className="Text here lol">
      <Tabs.List>
        <Tabs.Tab value="general info" icon={<IconReportMedical size={20} />}>
          General Info
        </Tabs.Tab>
        <Tabs.Tab value="consult notes" icon={<IconStethoscope size={20} />}>
          Consult Notes
        </Tabs.Tab>
        <Tabs.Tab value="spectacle details" icon={<IconEyeglass size={20} />}>
          Spectacle Details
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="general info" className="p-3">
        <GeneralInfoTable />
      </Tabs.Panel>
      <Tabs.Panel value="consult notes" className="p-3">
        <ConsultNotesTable />
      </Tabs.Panel>
      <Tabs.Panel value="spectacle details" className="p-3">
        <SpectacleDetailsTable />
      </Tabs.Panel>
    </Tabs>
  );
};

export default ConsultDetailsPage;
