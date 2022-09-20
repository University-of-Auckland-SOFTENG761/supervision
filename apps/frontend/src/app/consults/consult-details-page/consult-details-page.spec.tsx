import { render } from '@testing-library/react';
import ConsultDetails from './consult-details-page';

describe('Consult Details Page', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ConsultDetails />);
    expect(baseElement).toBeTruthy();
  });
});
