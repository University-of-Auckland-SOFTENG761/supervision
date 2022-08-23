import { render } from '@testing-library/react';
import ConsultRecordsTable from './consult-records-table';

describe('Consult Records Table', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ConsultRecordsTable />);
    expect(baseElement).toBeTruthy();
  });
});
