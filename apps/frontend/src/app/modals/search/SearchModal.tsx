import { PatientRecordsTable } from '@components';
import { ActionIcon, Modal, TextInput } from '@mantine/core';
import { IconSearch, IconUserPlus } from '@tabler/icons';
import { useState } from 'react';
import styles from './SearchModal.module.scss';

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
      <div className="d-flex flex-col">
        <PatientRecordsTable />
        <ActionIcon
          className="float-right mt-4"
          variant="filled"
          color="blue"
          size="lg"
        >
          <IconUserPlus size={14} />
        </ActionIcon>
      </div>
    </Modal>
  );
}
