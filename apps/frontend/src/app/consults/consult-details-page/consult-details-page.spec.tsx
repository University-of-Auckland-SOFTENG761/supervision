import { render } from '@testing-library/react';
import ConsultDetails from './consult-details-page';
import { BrowserRouter } from 'react-router-dom';

describe('Consult Details Page', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <ConsultDetails />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
