import { PatientRecordsTable } from '@components';
import { ActionIcon, Modal, TextInput } from '@mantine/core';
import { IconSearch, IconUserPlus } from '@tabler/icons';
import { ForwardedRef, forwardRef, useImperativeHandle, useState } from 'react';

export interface SearchModalRef {
  show(): void;
}

export interface SearchModalProps {
  onUserCreate?: () => void;
}

export const SearchModal = forwardRef(
  (props: SearchModalProps, ref: ForwardedRef<SearchModalRef>) => {
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
            onClick={props.onUserCreate}
          >
            <IconUserPlus size={14} />
          </ActionIcon>
        </div>
      </Modal>
    );
  }
);
