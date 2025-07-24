import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import PaymentMethodIcon from '../PaymentMethodIcon';

describe('PaymentMethodIcon', () => {
  it('renders without crashing', () => {
    render(<PaymentMethodIcon method={"visa"} />);
  });
}); 