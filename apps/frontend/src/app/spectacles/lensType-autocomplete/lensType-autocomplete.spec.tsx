import { render } from '@testing-library/react';
import LensTypeAutocomplete from './lensType-autocomplete';

describe('LensTypeAutocomplete', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <LensTypeAutocomplete value="" onChange={jest.fn()} />
    );
    expect(baseElement).toBeTruthy();
  });
});
