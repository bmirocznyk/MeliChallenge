import { describe, it, expect, vi, beforeEach, type Mocked } from 'vitest';
import { PurchaseProductUseCase } from './PurchaseProductUseCase';
import { ProductRepository } from '../../domain/repositories/ProductRepository';
import { Product } from '../../shared/types/product';

describe('PurchaseProductUseCase', () => {
  let productRepository: Mocked<ProductRepository>;
  let useCase: PurchaseProductUseCase;

  const mockProduct: Product = {
    id: '1',
    title: 'Test Product',
    price: 100,
    currency: 'USD',
    condition: 'new',
    availableQuantity: 5,
    images: [],
    description: '',
    reviews: { rating: 0, totalReviews: 0, ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } },
    installments: { quantity: 1, amount: 100, totalAmount: 100, interestRate: 0, isFree: true },
    categories: [],
    attributes: [],
    variants: []
  };

  beforeEach(() => {
    productRepository = {
      findById: vi.fn(),
      saveProducts: vi.fn()
    };
    useCase = new PurchaseProductUseCase(productRepository);
  });

  it('successfully purchases a product when stock is available', async () => {
    const initialQuantity = mockProduct.availableQuantity;
    productRepository.findById.mockResolvedValue({ ...mockProduct });
    productRepository.saveProducts.mockResolvedValue();

    const result = await useCase.execute('1', 2);

    expect(result.success).toBe(true);
    expect(result.product?.availableQuantity).toBe(initialQuantity - 2);
    expect(productRepository.findById).toHaveBeenCalledWith('1');
    expect(productRepository.saveProducts).toHaveBeenCalled();
  });

  it('fails when product is not found', async () => {
    productRepository.findById.mockResolvedValue(null);
    const result = await useCase.execute('999', 1);
    expect(result.success).toBe(false);
    expect(result.message).toBe('Product not found');
    expect(productRepository.saveProducts).not.toHaveBeenCalled();
  });

  it('fails when not enough stock', async () => {
    productRepository.findById.mockResolvedValue({ ...mockProduct });
    const result = await useCase.execute('1', 10);
    expect(result.success).toBe(false);
    expect(result.message).toBe('Not enough stock');
    expect(productRepository.saveProducts).not.toHaveBeenCalled();
  });

  it('fails when product has no availableQuantity property', async () => {
    const productWithoutQuantity = { ...mockProduct } as Product;
    // @ts-expect-error
    delete productWithoutQuantity.availableQuantity;
    productRepository.findById.mockResolvedValue(productWithoutQuantity);
    const result = await useCase.execute('1', 1);
    expect(result.success).toBe(false);
    expect(result.message).toBe('Not enough stock');
    expect(productRepository.saveProducts).not.toHaveBeenCalled();
  });

  it('throws if repository throws during findById', async () => {
    productRepository.findById.mockRejectedValue(new Error('DB error'));
    await expect(useCase.execute('1', 1)).rejects.toThrow('DB error');
  });

  it('throws if repository throws during saveProducts', async () => {
    productRepository.findById.mockResolvedValue({ ...mockProduct });
    productRepository.saveProducts.mockRejectedValue(new Error('DB error'));
    await expect(useCase.execute('1', 1)).rejects.toThrow('DB error');
  });
}); 