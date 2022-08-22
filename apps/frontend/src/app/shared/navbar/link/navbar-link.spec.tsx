import { IconTestPipe } from '@tabler/icons';
import { render } from '@testing-library/react';

import NavbarLink from './navbar-link';

describe('Navbar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <NavbarLink icon={IconTestPipe} label="test" />
    );
    expect(baseElement).toBeTruthy();
  });
});
