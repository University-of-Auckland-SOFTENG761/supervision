import { render } from '@testing-library/react';
import PatientDetails from './patient-details-page';

describe('Patient Details Page', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PatientDetails />);
    expect(baseElement).toBeTruthy();
  });
});
