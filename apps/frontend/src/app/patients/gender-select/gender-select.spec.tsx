import { render } from '@testing-library/react';
import GenderSelect from './gender-select';

describe('Gender Select', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <GenderSelect value="" onChange={jest.fn()} />
    );
    expect(baseElement).toBeTruthy();
  });
});
