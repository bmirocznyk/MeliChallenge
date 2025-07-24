import { describe, it, expect } from 'vitest';
import { createPurchaseRoutes } from './PurchaseRoutes';

describe('createPurchaseRoutes', () => {
  it('returns an Express router', () => {
    const mockController = { purchase: () => {} };
    const router = createPurchaseRoutes(mockController as any);
    expect(router).toBeDefined();
    expect(typeof router.use).toBe('function');
  });
}); 