import { describe, it, expect } from 'vitest';

describe('purchase-server entrypoint', () => {
  it('should import without throwing', () => {
    expect(() => require('./purchase-server')).not.toThrow();
  });
}); 