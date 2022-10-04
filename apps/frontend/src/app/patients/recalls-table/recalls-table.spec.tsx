import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RecallsTable from './recalls-table';

describe('Recalls Table', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MemoryRouter>
        <RecallsTable patientConsults={[]} />
      </MemoryRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
