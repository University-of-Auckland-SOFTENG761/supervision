import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PatientTabs from './patient-tabs';

describe('Patient Tabs', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MemoryRouter>
        <PatientTabs />
      </MemoryRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
