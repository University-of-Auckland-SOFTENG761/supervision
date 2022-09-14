import React from 'react';
import { ConsultInputs } from '../consult-inputs';

export type IConsult = {
  uid: string; // TODO: add all other fields
};

export const ConsultDetailsPage = () => {
  const [consults, setConsults] = React.useState<IConsult[]>([
    {
      uid: '9c78e8d5-26e5-4a99-a112-0b8602bf2c1c',
    },
  ]);

  const [currentConsult, setCurrentConsult] = React.useState<IConsult>(
    consults[0]
  );

  const handleConsultChange = (uid: string) => {
    const consult = consults.find((c) => c.uid === uid);
    if (consult) {
      setCurrentConsult(consult);
    }
  };

  const handleUpdateConsult = (updatedConsult: IConsult) => {
    setCurrentConsult(updatedConsult);
    const newConsults = consults.map((c) => {
      if (c.uid === updatedConsult.uid) {
        return updatedConsult;
      }
      return c;
    });
    setConsults(newConsults);
  };

  return (
    <>
      <ConsultInputs
        consult={currentConsult}
        onUpdateConsult={handleUpdateConsult}
      />
    </>
  );
};

export default ConsultDetailsPage;
