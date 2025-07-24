import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import { SellerInfo } from '../SellerInfo';

describe('SellerInfo', () => {
  it('renders without crashing', () => {
    render(<SellerInfo seller={{ id: 1, name: 'Test Seller', reputation: 'green' }} />);
  });
}); 