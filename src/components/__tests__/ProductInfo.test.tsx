// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { render } from '@testing-library/react';
import { ProductInfo } from '../ProductInfo';

describe('ProductInfo', () => {
  it('renders without crashing', () => {
    render(<ProductInfo product={{ id: '1', title: 'Test', price: 100, currency: 'USD', condition: 'new', availableQuantity: 1, soldQuantity: 0, images: [], description: '', reviews: {}, installments: {}, categories: [], attributes: [], variants: [] }} />);
  });
}); 