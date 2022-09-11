import { IPatient } from '@patients';
import { uuid } from 'uuidv4';
import { useState, useEffect, useCallback } from 'react';
import { RxDatabase, RxDocument } from 'rxdb';
import { patientDatabase } from 'database';

export const usePatients = () => {
  const [patientsDb, setPatientsDb] = useState<RxDatabase>();
  const [patients, setPatients] = useState<IPatient[]>([]);

  const newPatient = useCallback(() => {
    const newPatient = {
      id: uuid(),
      firstName: '',
      lastName: '',
    };
    patientsDb?.['patients'].insert(newPatient);
    return newPatient.id;
  }, [patientsDb]);

  const updatePatient = (patient: IPatient) => {
    patientsDb?.['patients']
      .findOne({
        selector: {
          id: patient.id,
        },
      })
      .exec()
      .then((result: RxDocument) => {
        if (result) {
          result.update(patient);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    patientDatabase
      .get()
      ?.then((db: RxDatabase | null) => {
        db && setPatientsDb(db);
      })
      .catch((error: Error) => {
        console.log(error);
      })
      .finally(() => {
        console.log('database loaded');
      });
  }, []);

  useEffect(() => {
    if (patientsDb) {
      patientsDb['patients'].find().$.subscribe((patients) => {
        setPatients(patients);
      });
    }
    return () => {
      patientsDb?.['patients'].find().$.unsubscribe();
    };
  }, [patientsDb]);

  return { patients, newPatient, updatePatient };
};

export default usePatients;
