import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import AppShell from './app-shell';

describe('AppShell', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MemoryRouter>
        <AppShell />
      </MemoryRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
