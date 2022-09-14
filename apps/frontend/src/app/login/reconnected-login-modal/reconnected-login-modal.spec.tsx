import { render } from '@testing-library/react';
import ReconnectedLoginModal from './reconnected-login-modal';

describe('Reconnected Login Modal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReconnectedLoginModal />);
    expect(baseElement).toBeTruthy();
  });
});
