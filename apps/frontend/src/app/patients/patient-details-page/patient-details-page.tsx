import { useEffect, useState } from 'react';
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
  const [patientId, setPatientId] = useState<string | null>(
    searchParams.get('patientId')
  );
  const navigate = useNavigate();

  //!DO NOT DELETE. REACT WILL NOT RE-RENDER WITHOUT
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [patientRevision, setPatientRevision] = useState<string | undefined>();
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
    if (patientsCollection && patientId && patientId !== patient?.id) {
      setIsLoading(true);
      patientsCollection
        .findOne({ selector: { id: patientId } })
        .$.subscribe((patient) => {
          setPatient(patient);
          setPatientRevision(patient?.revision); //!MUST NOT BE REMOVED
          setIsLoading(false);
        });
    }
  }, [patientsCollection, patientId, patient?.id]);

  useEffect(() => {
    if (consultsCollection && patientId) {
      consultsCollection
        .find({
          selector: {
            patientId: patientId,
          },
        })
        .$.subscribe((consults) => {
          setConsults(
            new Map(
              consults.map(
                (consult) =>
                  [consult.id, consult] as [string, RxDocument<ConsultDocType>]
              )
            )
          );
        });
    }
  }, [consultsCollection, patient, patientId]);

  const handleCreateNewRecord = async () => {
    if (newConsult && patientId) {
      const newConsultId = await newConsult(patientId);
      if (newConsultId) {
        navigate(`/consult-details?consultId=${newConsultId}`);
      }
    }
  };

  useEffect(() => {
    setPatientId(searchParams.get('patientId'));
  }, [searchParams]);

  if ((isLoading && patientId) || (patient?.id && patientId !== patient?.id)) {
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
        <ScrollArea className="h-full p-8" key={patient.id}>
          <PatientInputs
            patient={patient}
            consults={consults}
            updatePatient={handleUpdatePatient}
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
