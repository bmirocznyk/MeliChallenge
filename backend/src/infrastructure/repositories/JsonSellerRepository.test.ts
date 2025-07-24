import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { JsonSellerRepository } from './JsonSellerRepository';
import * as fs from 'fs';
import { Seller } from '@/shared/types/product';

vi.mock('fs');

describe('JsonSellerRepository', () => {
  let repository: JsonSellerRepository;
  const mockSellers: Seller[] = [
    { id: 1, name: 'Apple Store Argentina', reputation: 'green' },
    { id: 2, name: 'Samsung Oficial', reputation: 'yellow' }
  ];

  beforeEach(() => {
    repository = new JsonSellerRepository();
    (fs.readFileSync as any).mockReturnValue(JSON.stringify(mockSellers));
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('findById returns a seller when found', async () => {
    const seller = await repository.findById(1);
    expect(seller).toEqual(mockSellers[0]);
  });

  it('findById returns null when not found', async () => {
    const seller = await repository.findById(999);
    expect(seller).toBeNull();
  });

  it('findById handles JSON parse error gracefully', async () => {
    (fs.readFileSync as any).mockImplementation(() => { throw new Error('read error'); });
    const seller = await repository.findById(1);
    expect(seller).toBeNull();
  });
}); 