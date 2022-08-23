import { render } from '@testing-library/react';
import PatientTabs from './patient-tabs';

describe('Patient Tabs', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <PatientTabs
        patients={[{ uid: 'test-uid-1' }, { uid: 'test-uid-2' }]}
        onPatientChange={jest.fn()}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
