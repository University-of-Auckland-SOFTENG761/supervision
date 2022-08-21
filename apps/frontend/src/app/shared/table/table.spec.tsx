import { render } from '@testing-library/react';

import Table from './header';

describe('Header', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Table />);
    expect(baseElement).toBeTruthy();
  });
});
