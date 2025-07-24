import { describe, it, expect } from 'vitest';
import { createProductRoutes } from './ProductRoutes';

const mockController = {
  getProduct: () => {},
  getProductComments: () => {},
  getProductWithPaymentMethods: () => {},
  getPaymentMethods: () => {},
  getPaymentMethodsByIds: () => {},
  getSeller: () => {},
};

describe('createProductRoutes', () => {
  it('returns an Express router', () => {
    const router = createProductRoutes(mockController as any);
    expect(router).toBeDefined();
    expect(typeof router.use).toBe('function');
  });
}); 