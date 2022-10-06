import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from './login-page';

describe('Login Page', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
