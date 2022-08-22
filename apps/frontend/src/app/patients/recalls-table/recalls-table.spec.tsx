import { render } from '@testing-library/react';
import RecallsTable from './recalls-table';

describe('Recalls Table', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RecallsTable />);
    expect(baseElement).toBeTruthy();
  });
});
