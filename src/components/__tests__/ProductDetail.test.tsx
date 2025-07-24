import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import { ProductDetail } from '../ProductDetail';
import { mockProduct } from '../../data/mockProduct';

describe('ProductDetail', () => {
  it('renders without crashing', () => {
    render(<ProductDetail product={mockProduct} />);
  });
}); 