import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import DispensingRecordsTable from './dispensing-records-table';

describe('Dispensing Records Table', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <DispensingRecordsTable patientConsults={[]} />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
