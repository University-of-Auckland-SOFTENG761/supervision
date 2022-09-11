import { IPatient } from '@patients';
import { uuid } from 'uuidv4';
import PatientDatabase from 'database/patient-database';
import { useState, useEffect, useCallback } from 'react';
import { RxDatabase, RxDocument } from 'rxdb';

const usePatients = () => {
  const [patientsDb, setPatientsDb] = useState<RxDatabase>();
  const [patients, setPatients] = useState<IPatient[]>([]);

  const newPatient = useCallback(() => {
    const newPatient = {
      uid: uuid(),
      firstName: '',
      lastName: '',
    };
    patientsDb?.['patients'].insert(newPatient);
    return newPatient.uid;
  }, [patientsDb]);

  const updatePatient = (patient: IPatient) => {
    patientsDb?.['patients']
      .findOne({
        selector: {
          uid: patient.uid,
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
    PatientDatabase.get()
      .then((db) => {
        setPatientsDb(db);
      })
      .catch((error) => {
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
