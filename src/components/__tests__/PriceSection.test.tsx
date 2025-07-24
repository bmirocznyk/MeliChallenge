// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { render } from '@testing-library/react';
import { PriceSection } from '../PriceSection';

describe('PriceSection', () => {
  it('renders without crashing', () => {
    render(<PriceSection price={100} currency="USD" installments={{ quantity: 1, amount: 100, rate: 0 }} />);
  });
}); 