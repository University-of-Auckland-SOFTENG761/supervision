import { render } from '@testing-library/react';
import { ConsultDocType, PatientDocType } from 'database';
import { MemoryRouter } from 'react-router-dom';
import { RxDocument } from 'rxdb';
import PatientInputs from './patient-inputs';

describe('Patient Inputs', () => {
  it('should render successfully', () => {
    const patient = {
      id: 'test',
      get() {
        return undefined;
      },
      toMutableJSON() {
        return {};
      },
    };

    const consults = new Map<string, RxDocument<ConsultDocType>>();

    const { baseElement } = render(
      <MemoryRouter>
        <PatientInputs
          patient={patient as unknown as RxDocument<PatientDocType>}
          updatePatient={() => {
            return null;
          }}
          consults={consults}
        />
      </MemoryRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
