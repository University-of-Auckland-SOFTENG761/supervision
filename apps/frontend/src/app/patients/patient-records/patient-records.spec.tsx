import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PatientRecords from './patient-records';
import { RxDocument } from 'rxdb';
import { ConsultDocType } from 'database';

describe('Patient Records', () => {
  it('should render successfully', () => {
    const consults = new Map<string, RxDocument<ConsultDocType>>();
    const { baseElement } = render(
      <MemoryRouter>
        <PatientRecords consults={consults} />
      </MemoryRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
