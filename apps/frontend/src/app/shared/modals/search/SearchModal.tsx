import { PatientRecordsTable } from '@patients';
import { ActionIcon, Modal, TextInput } from '@mantine/core';
import { useDatabase } from '@shared';
import { IconSearch, IconUserPlus } from '@tabler/icons';
import { ForwardedRef, forwardRef, useImperativeHandle, useState } from 'react';
import { PatientDocument } from 'database/rxdb-utils';
import { useNavigate } from 'react-router-dom';

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

    const { patients } = useDatabase();

    const filteredRecords: (_: string) => PatientDocument[] = (
      nameString: string
    ) => {
      return patients?.filter((record) => {
        const name = `${record.firstName} ${record.lastName}`;
        return name.toLowerCase().includes(nameString.toLowerCase());
      }) as PatientDocument[];
    };

    useImperativeHandle(ref, () => ({
      show() {
        setOpened(true);
      },
    }));

    const navigate = useNavigate();

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
          <PatientRecordsTable
            onPatientSelected={(patient) => {
              navigate(`/patient-details?patientId=${patient.id}`);
              setOpened(false);
            }}
            patientRecords={filteredRecords(searchString)}
          />
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
