// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { render } from '@testing-library/react';
import { ProductAttributes } from '../ProductAttributes';

describe('ProductAttributes', () => {
  it('renders without crashing', () => {
    render(<ProductAttributes attributes={[]} />);
  });
}); 