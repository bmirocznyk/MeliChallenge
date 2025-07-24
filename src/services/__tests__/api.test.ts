// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { api } from '../api';

describe('api service', () => {
  it('should have getItem, getProductWithSellerAndPaymentMethods, and purchaseProduct methods', () => {
    expect(typeof api.getItem).toBe('function');
    expect(typeof api.getProductWithSellerAndPaymentMethods).toBe('function');
    expect(typeof api.purchaseProduct).toBe('function');
  });
}); 