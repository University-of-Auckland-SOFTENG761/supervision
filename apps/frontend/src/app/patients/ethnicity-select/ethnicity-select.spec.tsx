import { render } from '@testing-library/react';
import EthnicitySelect from './ethnicity-select';

describe('Ethnicity Select', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <EthnicitySelect value="" onChange={jest.fn()} />
    );
    expect(baseElement).toBeTruthy();
  });
});
