import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Header from './header';

describe('Header', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
