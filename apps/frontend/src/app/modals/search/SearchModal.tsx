import { PatientRecordsTable } from '@components';
import { ActionIcon, Modal, TextInput } from '@mantine/core';
import { IconSearch, IconUserPlus } from '@tabler/icons';
import { useState } from 'react';

export function SearchModal() {
  const [opened, setOpened] = useState(false);

  return (
    <Modal
      size="xl"
      opened={true}
      onClose={() => setOpened(false)}
      title={
        <TextInput
          placeholder="Search Patients"
          icon={<IconSearch size={14} />}
        />
      }
    >
      <div>
        <PatientRecordsTable />
        <ActionIcon variant="filled" color="blue">
          <IconUserPlus />
        </ActionIcon>
      </div>
    </Modal>
  );
}
