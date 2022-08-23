import { render } from '@testing-library/react';
import PatientRecords from './patient-records';

describe('Patient Records', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PatientRecords />);
    expect(baseElement).toBeTruthy();
  });
});
