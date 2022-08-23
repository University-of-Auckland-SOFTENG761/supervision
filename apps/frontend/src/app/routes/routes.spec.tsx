import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

describe('Routes', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
