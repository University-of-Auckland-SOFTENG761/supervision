import { PatientRecordsTable } from '@patients';
import { ActionIcon, Modal, TextInput } from '@mantine/core';
import { IconSearch, IconUserPlus } from '@tabler/icons';
import { ForwardedRef, forwardRef, useImperativeHandle, useState } from 'react';

const patientRecords = [
  {
    name: 'Jackson Chadfield',
    dateOfBirth: new Date(2000, 11, 17),
    school: 'University of Auckland',
    lastSeenBy: 'Veeran',
  },
  {
    name: 'Backson Chadfield',
    dateOfBirth: new Date(2000, 11, 17),
    school: 'University of Auckland',
    lastSeenBy: 'Veeran',
  },
  {
    name: 'Hackson Chadfield',
    dateOfBirth: new Date(2000, 11, 17),
    school: 'University of Auckland',
    lastSeenBy: 'Veeran',
  },
  {
    name: 'Packson Chadfield',
    dateOfBirth: new Date(2000, 11, 17),
    school: 'University of Auckland',
    lastSeenBy: 'Veeran',
  },
  {
    name: 'Lilly Zhang',
    dateOfBirth: new Date(2000, 11, 17),
    school: 'University of Auckland',
    lastSeenBy: 'Veeran',
  },
];

export interface SearchModalRef {
  show(): void;
}

export interface SearchModalProps {
  onUserCreate?: () => void;
}

export const SearchModal = forwardRef(
  (props: SearchModalProps, ref: ForwardedRef<SearchModalRef>) => {
    const [opened, setOpened] = useState(false);
    const [patientRecordsUpdated, setPatientRecordsUpdated] =
      useState(patientRecords);

    const onSearchChanged = (nameString: string) => {
      const patients: {
        name: string;
        dateOfBirth: Date;
        school: string;
        lastSeenBy: string;
      }[] = [];

      patientRecords.map((record) => {
        if (record.name.toLowerCase().includes(nameString.toLowerCase())) {
          patients.push(record);
        }
      });

      setPatientRecordsUpdated(patients);
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
            onChange={(event) => onSearchChanged(event.currentTarget.value)}
          />
        }
      >
        <div className="d-flex flex-col">
          <PatientRecordsTable patientRecords={patientRecordsUpdated} />
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
