import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Routes from './routes';

describe('Routes', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MemoryRouter>
        <Routes />
      </MemoryRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
