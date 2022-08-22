import { render } from '@testing-library/react';
import PatientInputs from './patient-inputs';

describe('Patient Inputs', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <PatientInputs patient={{ uid: 'test-id' }} onUpdatePatient={jest.fn()} />
    );
    expect(baseElement).toBeTruthy();
  });
});
