import { render } from '@testing-library/react';
import DispensingRecordsTable from './dispensing-records-table';

describe('Dispensing Records Table', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DispensingRecordsTable />);
    expect(baseElement).toBeTruthy();
  });
});
