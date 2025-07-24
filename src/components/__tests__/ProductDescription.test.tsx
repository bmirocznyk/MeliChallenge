// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { render } from '@testing-library/react';
import { ProductDescription } from '../ProductDescription';

describe('ProductDescription', () => {
  it('renders without crashing', () => {
    render(<ProductDescription description="Test description" />);
  });
}); 