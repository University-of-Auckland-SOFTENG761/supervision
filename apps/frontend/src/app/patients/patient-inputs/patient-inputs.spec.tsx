import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PatientInputs from './patient-inputs';

describe('Patient Inputs', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MemoryRouter>
        <PatientInputs patientConsults={[]} />
      </MemoryRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
