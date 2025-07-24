// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { render } from '@testing-library/react';
import { PaymentMethodIcon } from '../PaymentMethodIcon';

describe('PaymentMethodIcon', () => {
  it('renders without crashing', () => {
    render(<PaymentMethodIcon methodId={1} />);
  });
}); 