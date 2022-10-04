import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PatientDetails from './patient-details-page';

describe('Patient Details Page', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MemoryRouter>
        <PatientDetails />
      </MemoryRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
