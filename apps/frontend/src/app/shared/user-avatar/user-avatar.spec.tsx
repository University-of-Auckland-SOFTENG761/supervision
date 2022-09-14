import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UserAvatar from './user-avatar';

describe('User Avatar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <UserAvatar />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
