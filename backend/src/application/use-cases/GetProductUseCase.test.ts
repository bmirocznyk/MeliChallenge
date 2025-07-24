import { describe, it, expect, vi, beforeEach, type Mocked } from 'vitest';
import { GetProductUseCase } from './GetProductUseCase';
import { Product } from '../../shared/types/product';
import { ProductRepository } from '../../domain/repositories/ProductRepository';

describe('GetProductUseCase', () => {
  let productRepository: Mocked<ProductRepository>;
  let useCase: GetProductUseCase;

  const mockProduct: Product = {
    id: '1',
    title: 'Test Product',
    price: 100,
    currency: 'USD',
    condition: 'new',
    availableQuantity: 10,
    images: [],
    description: 'desc',
    reviews: { rating: 5, totalReviews: 1, ratingDistribution: { 5: 1, 4: 0, 3: 0, 2: 0, 1: 0 } },
    installments: { quantity: 1, amount: 100, totalAmount: 100, interestRate: 0, isFree: true },
    categories: [],
    attributes: [],
    variants: [],
  };

  beforeEach(() => {
    productRepository = {
      findById: vi.fn(),
      saveProducts: vi.fn(),
    };
    useCase = new GetProductUseCase(productRepository);
  });

  it('returns a product when found', async () => {
    productRepository.findById.mockResolvedValue(mockProduct);
    const result = await useCase.execute('1');
    expect(result).toEqual(mockProduct);
    expect(productRepository.findById).toHaveBeenCalledWith('1');
  });

  it('returns null if product is not found', async () => {
    productRepository.findById.mockResolvedValue(null);
    const result = await useCase.execute('999');
    expect(result).toBeNull();
    expect(productRepository.findById).toHaveBeenCalledWith('999');
  });

  it('throws if repository throws', async () => {
    productRepository.findById.mockRejectedValue(new Error('DB error'));
    await expect(useCase.execute('1')).rejects.toThrow('DB error');
  });
}); 