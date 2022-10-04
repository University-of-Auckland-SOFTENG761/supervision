import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ConsultRecordsTable from './consult-records-table';

describe('Consult Records Table', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MemoryRouter>
        <ConsultRecordsTable patientConsults={[]} />
      </MemoryRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
