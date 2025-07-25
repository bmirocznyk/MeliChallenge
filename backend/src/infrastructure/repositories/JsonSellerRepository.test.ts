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
    // Set up the mock before creating the repository
    (fs.readFileSync as any).mockReturnValue(JSON.stringify(mockSellers));
    repository = new JsonSellerRepository();
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

  it('findById returns null when not found with string id', async () => {
    const seller = await repository.findById('999');
    expect(seller).toBeNull();
  });

  it('findById handles JSON parse error gracefully', async () => {
    // Create a new repository instance with error mock
    (fs.readFileSync as any).mockImplementation(() => { throw new Error('read error'); });
    const errorRepository = new JsonSellerRepository();
    const seller = await errorRepository.findById(1);
    expect(seller).toBeNull();
  });
}); 