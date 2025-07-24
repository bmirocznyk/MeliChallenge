// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { render } from '@testing-library/react';
import { ProductDetail } from '../ProductDetail';
import { mockProduct } from '../../data/mockProduct';

describe('ProductDetail', () => {
  it('renders without crashing', () => {
    render(<ProductDetail product={mockProduct} />);
  });
}); 