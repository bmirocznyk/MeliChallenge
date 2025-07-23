import { describe, it, expect, beforeEach, vi } from 'vitest';
import { GetProductUseCase } from '../../application/use-cases/GetProductUseCase';
import { ProductRepository } from '../../domain/repositories/ProductRepository';

const mockProductRepository = {
  findAll: vi.fn(),
  findById: vi.fn(),
  findByCategory: vi.fn(),
  search: vi.fn(),
  getProductComments: vi.fn(),
  saveProducts: vi.fn(),
} as unknown as ProductRepository;

const mockProduct = {
  id: 1,
  title: 'iPhone 15 Pro',
  price: 1200000,
  currency: 'ARS',
  condition: 'new' as const,
  soldQuantity: 150,
  availableQuantity: 25,
  images: [],
  description: 'Latest iPhone with advanced features',
  reviews: { rating: 4.5, totalReviews: 89 },
  installments: { quantity: 12, amount: 100000, isFree: true },
  categories: [{ id: 1, name: 'Electronics', path: '/electronics' }],
  attributes: [],
  variants: []
};

describe('GetProductUseCase', () => {
  let getProductUseCase: GetProductUseCase;

  beforeEach(() => {
    vi.clearAllMocks();
    getProductUseCase = new GetProductUseCase(mockProductRepository);
  });

  it('should return product when found by ID', async () => {
    // Arrange
    const productId = 1;
    (mockProductRepository.findById as any).mockResolvedValue(mockProduct);

    // Act
    const result = await getProductUseCase.execute(productId);

    // Assert
    expect(result).toEqual(mockProduct);
    expect(mockProductRepository.findById).toHaveBeenCalledWith(productId);
    expect(mockProductRepository.findById).toHaveBeenCalledTimes(1);
  });

  it('should return null when product not found', async () => {
    // Arrange
    const productId = 999;
    (mockProductRepository.findById as any).mockResolvedValue(null);

    // Act
    const result = await getProductUseCase.execute(productId);

    // Assert
    expect(result).toBeNull();
    expect(mockProductRepository.findById).toHaveBeenCalledWith(productId);
  });

  it('should handle string ID parameter', async () => {
    // Arrange
    const productId = '1';
    (mockProductRepository.findById as any).mockResolvedValue(mockProduct);

    // Act
    const result = await getProductUseCase.execute(productId);

    // Assert
    expect(result).toEqual(mockProduct);
    expect(mockProductRepository.findById).toHaveBeenCalledWith(productId);
  });

  it('should propagate repository errors', async () => {
    // Arrange
    const productId = 1;
    const error = new Error('Database connection failed');
    (mockProductRepository.findById as any).mockRejectedValue(error);

    // Act & Assert
    await expect(getProductUseCase.execute(productId)).rejects.toThrow('Database connection failed');
    expect(mockProductRepository.findById).toHaveBeenCalledWith(productId);
  });

  it('should handle product with variants', async () => {
    // Arrange
    const productId = 1;
    const productWithVariants = {
      ...mockProduct,
      variants: [
        { id: 1, attributeId: 'COLOR', value: 'Black', selected: true },
        { id: 2, attributeId: 'STORAGE', value: '256GB', selected: false, price: 1300000 }
      ]
    };
    (mockProductRepository.findById as any).mockResolvedValue(productWithVariants);

    // Act
    const result = await getProductUseCase.execute(productId);

    // Assert
    expect(result).toEqual(productWithVariants);
    expect(result!.variants).toHaveLength(2);
    expect(mockProductRepository.findById).toHaveBeenCalledWith(productId);
  });

  it('should handle product with attributes', async () => {
    // Arrange
    const productId = 1;
    const productWithAttributes = {
      ...mockProduct,
      attributes: [
        { id: 'brand', name: 'Brand', value: 'Apple' },
        { id: 'model', name: 'Model', value: 'iPhone 15 Pro' }
      ]
    };
    (mockProductRepository.findById as any).mockResolvedValue(productWithAttributes);

    // Act
    const result = await getProductUseCase.execute(productId);

    // Assert
    expect(result).toEqual(productWithAttributes);
    expect(result!.attributes).toHaveLength(2);
    expect(mockProductRepository.findById).toHaveBeenCalledWith(productId);
  });

  it('should use injected repository for findById operations', () => {
    // Arrange & Act
    const useCase = new GetProductUseCase(mockProductRepository);

    // Assert
    expect(useCase.repository).toBe(mockProductRepository);
  });
}); 