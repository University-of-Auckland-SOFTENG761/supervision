import { IPatient } from '@patients';
import { uuid } from 'uuidv4';
import PatientDatabase from 'database/patient-database';
import { useState, useEffect, useCallback } from 'react';
import { RxDatabase } from 'rxdb';

//  {
//       uid: '8c78e8d5-26e5-4a99-a112-0b8602bf2c1b',
//       firstName: 'Yulia',
//       lastName: 'Pechorina',
//       dob: '2001-02-21',
//       patientId: '12345',
//       ethnicity: 'other european',
//       gender: 'female',
//       school: 'The University of Auckland',
//       year: 4,
//       room: 'N/A',
//       address: {
//         street: '1000 Fifth Avenue',
//         suburb: 'Manhattan',
//         city: 'New York',
//         postCode: '10028',
//       },
//       parentName: 'John Doe',
//       phoneNumber: '+64 9 12345678',
//       email: 'yulia@gmail.com',
//       notes: 'Nothing to add',
//     },
//     {
//       uid: 'c7695a78-33ae-4f71-9c54-4a3336628965',
//       firstName: 'Kid',
//       lastName: 'Cudi',
//       dob: '1984-01-30',
//       patientId: '54321',
//       gender: 'male',
//     },

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
  }, [patientsDb]);

  const updatePatient = (patient: IPatient) =>
    patientsDb?.['patients'].upsert(patient);

  const parseAndSetPatients = (patients: any[]) => {
    const parsedPatients = patients.map<IPatient>((patient: any) => {
      const {
        uid,
        firstName,
        lastName,
        dob,
        patientId,
        ethnicity,
        gender,
        school,
        year,
        room,
        address,
        parentName,
        phoneNumber,
        email,
        notes,
      } = patient;
      return {
        uid,
        firstName,
        lastName,
        dob,
        patientId,
        ethnicity,
        gender,
        school,
        year,
        room,
        address,
        parentName,
        phoneNumber,
        email,
        notes,
      } as IPatient;
    });
    setPatients(parsedPatients);
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
        parseAndSetPatients(patients);
      });
    }
    return () => {
      patientsDb?.['patients'].find().$.unsubscribe();
    };
  }, [patientsDb]);

  return { patients, newPatient, updatePatient };
};

export default usePatients;
