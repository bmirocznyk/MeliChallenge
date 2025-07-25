import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { JsonProductRepository } from './JsonProductRepository';
import { Product } from '@/shared/types/product';
import * as fs from 'fs';

vi.mock('fs');

describe('JsonProductRepository', () => {
  let repository: JsonProductRepository;
  const mockProducts: Product[] = [
    { id: '1', title: 'Product 1', price: 100, currency: 'USD', condition: 'new', availableQuantity: 10, images: [], description: '', reviews: { rating: 0, totalReviews: 0, ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } }, installments: { quantity: 1, amount: 100, totalAmount: 100, interestRate: 0, isFree: true }, categories: [], attributes: [], variants: [] },
    { id: '2', title: 'Product 2', price: 200, currency: 'USD', condition: 'used', availableQuantity: 5, images: [], description: '', reviews: { rating: 0, totalReviews: 0, ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } }, installments: { quantity: 1, amount: 200, totalAmount: 200, interestRate: 0, isFree: true }, categories: [], attributes: [], variants: [] }
  ];

  beforeEach(() => {
    repository = new JsonProductRepository();
    (fs.readFileSync as any).mockReturnValue(JSON.stringify(mockProducts));
    (fs.writeFileSync as any).mockClear();
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('findById returns a product when found', async () => {
    const product = await repository.findById('1');
    expect(product).toEqual(mockProducts[0]);
  });

  it('findById returns null when not found', async () => {
    const product = await repository.findById('999');
    expect(product).toBeNull();
  });

  it('findById handles JSON parse error gracefully', async () => {
    (fs.readFileSync as any).mockImplementation(() => { throw new Error('read error'); });
    const product = await repository.findById('1');
    expect(product).toBeNull();
  });

  it('saveProducts updates and writes the product', async () => {
    const product = await repository.findById('1');
    product!.title = 'Updated';
    await repository.saveProducts();
    
    const expectedProducts = [...mockProducts];
    expectedProducts[0] = { ...expectedProducts[0], title: 'Updated' };
    
    expect(fs.writeFileSync).toHaveBeenCalledWith(expect.any(String), JSON.stringify(expectedProducts, null, 2), 'utf-8');
  });

  it('saveProducts does nothing if no product was updated', async () => {
    await repository.saveProducts();
    expect(fs.writeFileSync).not.toHaveBeenCalled();
  });

  it('saveProducts throws if write fails', async () => {
    await repository.findById('1');
    (fs.writeFileSync as any).mockImplementation(() => { throw new Error('write error'); });
    await expect(repository.saveProducts()).rejects.toThrow('Failed to save products');
  });
}); 