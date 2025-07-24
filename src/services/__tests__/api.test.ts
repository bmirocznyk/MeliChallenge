import { describe, it, expect } from 'vitest';
import { api } from '../api';

describe('api service', () => {
  it('should have getItem, getProductWithSellerAndPaymentMethods, and purchaseProduct methods', () => {
    expect(typeof api.getItem).toBe('function');
    expect(typeof api.getProductWithSellerAndPaymentMethods).toBe('function');
    expect(typeof api.purchaseProduct).toBe('function');
  });
}); 