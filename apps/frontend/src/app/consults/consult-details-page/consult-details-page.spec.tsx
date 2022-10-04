import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ConsultDetails from './consult-details-page';
import { BrowserRouter } from 'react-router-dom';

describe('Consult Details Page', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MemoryRouter>
        <ConsultDetails />
      </MemoryRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
