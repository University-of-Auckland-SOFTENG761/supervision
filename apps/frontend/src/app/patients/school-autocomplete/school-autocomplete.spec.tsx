import { render } from '@testing-library/react';
import SchoolAutocomplete from './school-autocomplete';

describe('School Autocomplete', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <SchoolAutocomplete value="" onChange={jest.fn()} />
    );
    expect(baseElement).toBeTruthy();
  });
});
