import { describe, it, expect, beforeEach, vi } from 'vitest';
import { GetAllProductsUseCase } from '../../application/use-cases/GetAllProductsUseCase';
import { ProductRepository } from '../../domain/repositories/ProductRepository';

const mockProductRepository = {
  findAll: vi.fn(),
  findById: vi.fn(),
  findByCategory: vi.fn(),
  search: vi.fn(),
  getProductComments: vi.fn(),
  saveProducts: vi.fn(),
} as unknown as ProductRepository;

const mockProducts = [
  {
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
  },
  {
    id: 2,
    title: 'Samsung Galaxy S24',
    price: 980000,
    currency: 'ARS',
    condition: 'new' as const,
    soldQuantity: 89,
    availableQuantity: 12,
    images: [],
    description: 'Premium Android smartphone with AI features',
    reviews: { rating: 4.3, totalReviews: 67 },
    installments: { quantity: 12, amount: 81667, isFree: false },
    categories: [{ id: 1, name: 'Electronics', path: '/electronics' }],
    attributes: [],
    variants: []
  }
];

describe('GetAllProductsUseCase', () => {
  let getAllProductsUseCase: GetAllProductsUseCase;

  beforeEach(() => {
    vi.clearAllMocks();
    getAllProductsUseCase = new GetAllProductsUseCase(mockProductRepository);
  });

  it('should return all products', async () => {
    // Arrange
    (mockProductRepository.findAll as any).mockResolvedValue(mockProducts);

    // Act
    const result = await getAllProductsUseCase.execute();

    // Assert
    expect(result).toEqual(mockProducts);
    expect(mockProductRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it('should return empty array when no products exist', async () => {
    // Arrange
    (mockProductRepository.findAll as any).mockResolvedValue([]);

    // Act
    const result = await getAllProductsUseCase.execute();

    // Assert
    expect(result).toEqual([]);
    expect(mockProductRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it('should handle large product datasets', async () => {
    // Arrange
    const largeProductSet = Array.from({ length: 100 }, (_, i) => ({
      ...mockProducts[0],
      id: i + 1,
      title: `Product ${i + 1}`
    }));
    (mockProductRepository.findAll as any).mockResolvedValue(largeProductSet);

    // Act
    const result = await getAllProductsUseCase.execute();

    // Assert
    expect(result).toHaveLength(100);
    expect(mockProductRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it('should preserve product data integrity', async () => {
    // Arrange
    const productWithVariants = {
      ...mockProducts[0],
      variants: [
        { id: 1, attributeId: 'COLOR', value: 'Black', selected: true },
        { id: 2, attributeId: 'STORAGE', value: '256GB', selected: false, price: 1300000 }
      ]
    };
    (mockProductRepository.findAll as any).mockResolvedValue([productWithVariants]);

    // Act
    const result = await getAllProductsUseCase.execute();

    // Assert
    expect(result[0].variants).toHaveLength(2);
    expect(result[0].variants[0].selected).toBe(true);
    expect(result[0].variants[1].price).toBe(1300000);
    expect(mockProductRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it('should propagate repository errors', async () => {
    // Arrange
    const error = new Error('Database connection failed');
    (mockProductRepository.findAll as any).mockRejectedValue(error);

    // Act & Assert
    await expect(getAllProductsUseCase.execute()).rejects.toThrow('Database connection failed');
    expect(mockProductRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it('should use injected repository for findAll operations', () => {
    // Arrange & Act
    const useCase = new GetAllProductsUseCase(mockProductRepository);

    // Assert
    expect(useCase.repository).toBe(mockProductRepository);
  });
}); 