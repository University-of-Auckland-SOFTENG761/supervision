import { PatientRecordsTable } from '@patients';
import { ActionIcon, Modal, TextInput } from '@mantine/core';
import { useDatabase } from '@shared';
import { IconSearch, IconUserPlus } from '@tabler/icons';
import {
  ForwardedRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { PatientDocType } from 'database';
import { RxDocument } from 'rxdb';
import { useNavigate } from 'react-router-dom';

export interface SearchModalRef {
  show(): void;
}

export const SearchModal = forwardRef(
  (_, ref: ForwardedRef<SearchModalRef>) => {
    const { newPatient } = useDatabase();
    const navigate = useNavigate();
    const [opened, setOpened] = useState(false);
    const [searchString, setSearchString] = useState('');
    const [filteredRecords, setFilteredRecords] = useState<
      RxDocument<PatientDocType>[]
    >([]);
    const { patientsCollection } = useDatabase();

    useEffect(() => {
      if (patientsCollection) {
        patientsCollection
          .find({
            selector: {
              $or: [
                {
                  firstName: {
                    $regex: new RegExp(
                      searchString
                        .trim()
                        .replace(/\s+/g, ' ')
                        .split('')
                        .join('.*'),
                      'i'
                    ),
                    $options: 'i',
                  },
                },
                {
                  firstName: {
                    $regex: new RegExp(
                      searchString
                        .slice(searchString.indexOf(' ') + 1)
                        .trim()
                        .replace(/\s+/g, ' ')
                        .split('')
                        .join('.*'),
                      'i'
                    ),
                    $options: 'i',
                  },
                },
                {
                  lastName: {
                    $regex: new RegExp(
                      searchString
                        .trim()
                        .replace(/\s+/g, ' ')
                        .split('')
                        .join('.*'),
                      'i'
                    ),
                    $options: 'i',
                  },
                },
                {
                  lastName: {
                    $regex: new RegExp(
                      searchString
                        .slice(searchString.indexOf(' ') + 1)
                        .trim()
                        .replace(/\s+/g, ' ')
                        .split('')
                        .join('.*'),
                      'i'
                    ),
                    $options: 'i',
                  },
                },
              ],
            },
            limit: 10,
          })
          .$.subscribe((records) => {
            setFilteredRecords(records);
          });
      }
    }, [patientsCollection, searchString]);

    useImperativeHandle(ref, () => ({
      show() {
        setOpened(true);
      },
    }));

    const closeModal = () => setOpened(false);

    const handleCreateNewRecord = async () => {
      if (newPatient) {
        const newPatientId = await newPatient();
        if (newPatientId) {
          navigate(`/patient-details?patientId=${newPatientId}`);
          closeModal();
        }
      }
    };

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
            patientRecords={filteredRecords}
            closeModal={closeModal}
          />
          <ActionIcon
            className="float-right mt-4"
            variant="filled"
            color="blue"
            size="lg"
            onClick={handleCreateNewRecord}
          >
            <IconUserPlus size={14} />
          </ActionIcon>
        </div>
      </Modal>
    );
  }
);
