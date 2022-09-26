import { IPatient, PatientRecordsTable } from '@patients';
import { ActionIcon, Modal, TextInput } from '@mantine/core';
import { usePatients } from '@shared';
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
    const [searchString, setSearchString] = useState('');

    const { patients } = usePatients();

    const filteredRecords: (_: string) => IPatient[] = (nameString: string) => {
      return patients?.filter((record) => {
        const name = `${record.firstName} ${record.lastName}`;
        return name.toLowerCase().includes(nameString.toLowerCase());
      }) as IPatient[];
    };

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
            onChange={(event) => setSearchString(event.currentTarget.value)}
          />
        }
      >
        <div className="d-flex flex-col">
          <PatientRecordsTable patientRecords={filteredRecords(searchString)} />
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
