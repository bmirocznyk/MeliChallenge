import { describe, it, expect } from 'vitest';
import * as ProductTypes from './product';

describe('product types', () => {
  it('should import types without error', () => {
    expect(ProductTypes).toBeDefined();
  });
}); 