import { describe, it, expect } from 'vitest';

describe('server entrypoint', () => {
  it('should import without throwing', () => {
    expect(() => require('./server')).not.toThrow();
  });
}); 