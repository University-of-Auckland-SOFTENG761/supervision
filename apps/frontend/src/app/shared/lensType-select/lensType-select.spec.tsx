import { render } from '@testing-library/react';
import LensTypeSelect from './lensType-select';

describe('LensTypeSelect', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <LensTypeSelect value="" onChange={jest.fn()} />
    );
    expect(baseElement).toBeTruthy();
  });
});
