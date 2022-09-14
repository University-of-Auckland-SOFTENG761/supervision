import { IPatient } from '@patients';
import { uuid } from 'uuidv4';
import { useState, useEffect, useCallback } from 'react';
import { RxDatabase } from 'rxdb';
import { patientDatabase } from 'database';

export const usePatients = () => {
  const [patientsDb, setPatientsDb] = useState<RxDatabase>();
  const [patients, setPatients] = useState<IPatient[]>([]);

  const newPatient = useCallback(() => {
    const newPatient = {
      id: uuid(),
    };
    patientsDb?.['patients'].insert(newPatient);
    return newPatient.id;
  }, [patientsDb]);

  const updatePatient = (patient: IPatient) =>
    patientsDb?.['patients'].atomicUpsert(patient);

  useEffect(() => {
    if (!patientsDb) {
      patientDatabase
        .get()
        ?.then((db: RxDatabase | null) => {
          db && setPatientsDb(db);
          db && db['patients'].find().$.subscribe(setPatients);
          return () => db?.['patients'].find().$.unsubscribe();
        })
        .catch((error: Error) => {
          console.error(error);
        });
    }
  }, [patientsDb]);

  return { patients, newPatient, updatePatient };
};

export default usePatients;
