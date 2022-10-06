import { useEffect, useMemo, useState } from 'react';
import { Center, ScrollArea, Text, Loader } from '@mantine/core';
import { Button, useDatabase } from '@shared';
import { PatientTabs } from '../patient-tabs';
import { PatientInputs } from '../patient-inputs';
import { PatientRecords } from '../patient-records';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { RxDocument } from 'rxdb';
import { ConsultDocType, PatientDocType } from 'database';

export const PatientDetailsPage = () => {
  const { patientsCollection, consultsCollection, newConsult } = useDatabase();
  const [searchParams] = useSearchParams();
  const patientId = searchParams.get('patientId');
  const navigate = useNavigate();

  const [patient, setPatient] = useState<RxDocument<PatientDocType> | null>(
    null
  );
  const [consults, setConsults] = useState<Map<
    string,
    RxDocument<ConsultDocType>
  > | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleUpdatePatient = async (patient: PatientDocType) => {
    await patientsCollection?.atomicUpsert(patient);
  };

  useEffect(() => {
    if (patientsCollection && patientId) {
      setIsLoading(true);
      patientsCollection
        .findOne({ selector: { id: patientId } })
        .exec()
        .then((p) => {
          if (p) {
            setPatient(p);
          }
          setIsLoading(false);
        });
    }
  }, [patientsCollection, patientId]);

  useEffect(() => {
    if (patient && (patient.consultIds?.length ?? []) > 0) {
      // setIsLoading((l) => l + 1);
      consultsCollection
        ?.findByIds$(patient.consultIds ?? [])
        .subscribe((c) => {
          if (c) {
            setConsults(c);
          }
          // setIsLoading((l) => l - 1);
        });
    }
  }, [consultsCollection, patient]);

  const handleCreateNewRecord = () => {
    const patientRecordsTab =
      searchParams.get('patientRecordsTab') ?? 'consult';
    if (newConsult && patientId && patientRecordsTab === 'consult') {
      const newConsultId = newConsult(patientId);
      navigate(`/consult-details?consultId=${newConsultId}`);
    }
  };

  if (isLoading && patientId) {
    // This is currently ugly but it prevents inputs from being loaded with incorrect defaultValues
    return (
      <Center className="w-full h-full">
        <Loader />
      </Center>
    );
  }

  return (
    <>
      <PatientTabs />
      {patientId && patient ? (
        <ScrollArea className="h-full p-8">
          <PatientInputs
            patient={patient}
            consults={consults}
            updatePatient={handleUpdatePatient}
            key={patient.id}
          />
          <div className="flex mt-5 -mb-5 justify-end w-full">
            <Button onClick={handleCreateNewRecord} className="ml-auto">
              CREATE NEW RECORD
            </Button>
          </div>
          <PatientRecords className="pb-5" consults={consults} />
        </ScrollArea>
      ) : (
        <Center className="h-full">
          <Text>Click on a patient to view their details</Text>
        </Center>
      )}
    </>
  );
};

export default PatientDetailsPage;
