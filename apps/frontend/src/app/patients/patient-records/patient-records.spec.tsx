import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PatientRecords from './patient-records';

describe('Patient Records', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MemoryRouter>
        <PatientRecords patientConsults={[]} />
      </MemoryRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
