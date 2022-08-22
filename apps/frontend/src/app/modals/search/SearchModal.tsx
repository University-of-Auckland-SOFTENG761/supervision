import { PatientRecordsTable } from '@components';
import { ActionIcon, Modal, TextInput } from '@mantine/core';
import { IconSearch, IconUserPlus } from '@tabler/icons';
import { forwardRef, useImperativeHandle, useState } from 'react';

export interface SearchModalRef {
  show(): void;
}

export const SearchModal = forwardRef((props, ref) => {
  const [opened, setOpened] = useState(false);

  useImperativeHandle(ref, () => ({
    show() {
      setOpened(true);
    },
  }));

  return (
    <Modal
      size="xl"
      opened={opened}
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
});
