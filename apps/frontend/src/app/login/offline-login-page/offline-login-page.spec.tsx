import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import OfflineLoginPage from './offline-login-page';

describe('Offline Login Page', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <OfflineLoginPage />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
