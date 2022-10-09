import { render } from '@testing-library/react';
import CodeAutocomplete from './code-autocomplete';

describe('CodeAutocomplete', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <CodeAutocomplete value="" onChange={jest.fn()} />
    );
    expect(baseElement).toBeTruthy();
  });
});
