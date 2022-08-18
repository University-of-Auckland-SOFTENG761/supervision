import { render } from '@testing-library/react';

import NavbarLink from './navbar';

describe('Navbar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NavbarLink />);
    expect(baseElement).toBeTruthy();
  });
});
