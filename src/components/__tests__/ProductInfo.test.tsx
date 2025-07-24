import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import { ProductInfo } from '../ProductInfo';

const mockProduct = {
  id: '1',
  title: 'Test',
  price: 100,
  currency: 'USD',
  condition: 'new' as const,
  availableQuantity: 1,
  soldQuantity: 0,
  images: [],
  description: '',
  reviews: { rating: 0, totalReviews: 0, ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } },
  installments: { quantity: 1, amount: 100, totalAmount: 100, interestRate: 0, isFree: true },
  categories: [],
  attributes: [],
  variants: []
};

describe('ProductInfo', () => {
  it('renders without crashing', () => {
    render(<ProductInfo product={mockProduct} />);
  });
}); 