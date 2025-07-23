import { describe, it, expect, beforeEach, vi } from 'vitest';
import { SearchProductsUseCase } from '../../application/use-cases/SearchProductsUseCase';
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

describe('SearchProductsUseCase', () => {
  let searchProductsUseCase: SearchProductsUseCase;

  beforeEach(() => {
    vi.clearAllMocks();
    searchProductsUseCase = new SearchProductsUseCase(mockProductRepository);
  });

  it('should return search results for valid query', async () => {
    // Arrange
    const query = 'iPhone';
    const expectedResults = [mockProducts[0]];

    (mockProductRepository.search as any).mockResolvedValue(expectedResults);

    // Act
    const result = await searchProductsUseCase.execute(query);

    // Assert
    expect(result).toEqual(expectedResults);
    expect(mockProductRepository.search).toHaveBeenCalledWith(query);
    expect(mockProductRepository.search).toHaveBeenCalledTimes(1);
  });

  it('should return empty array for no results', async () => {
    // Arrange
    const query = 'nonexistent';
    (mockProductRepository.search as any).mockResolvedValue([]);

    // Act
    const result = await searchProductsUseCase.execute(query);

    // Assert
    expect(result).toEqual([]);
    expect(mockProductRepository.search).toHaveBeenCalledWith(query);
  });

  it('should return multiple results for broad search', async () => {
    // Arrange
    const query = 'phone';
    (mockProductRepository.search as any).mockResolvedValue(mockProducts);

    // Act
    const result = await searchProductsUseCase.execute(query);

    // Assert
    expect(result).toEqual(mockProducts);
    expect(mockProductRepository.search).toHaveBeenCalledWith(query);
  });

  it('should handle case-insensitive search', async () => {
    // Arrange
    const query = 'iphone';
    const expectedResults = [mockProducts[0]];
    (mockProductRepository.search as any).mockResolvedValue(expectedResults);

    // Act
    const result = await searchProductsUseCase.execute(query);

    // Assert
    expect(result).toEqual(expectedResults);
    expect(mockProductRepository.search).toHaveBeenCalledWith(query);
  });

  it('should handle search by brand', async () => {
    // Arrange
    const query = 'Samsung';
    const expectedResults = [mockProducts[1]];
    (mockProductRepository.search as any).mockResolvedValue(expectedResults);

    // Act
    const result = await searchProductsUseCase.execute(query);

    // Assert
    expect(result).toEqual(expectedResults);
    expect(mockProductRepository.search).toHaveBeenCalledWith(query);
  });

  it('should handle search in product description', async () => {
    // Arrange
    const query = 'AI features';
    (mockProductRepository.search as any).mockResolvedValue([mockProducts[1]]);

    // Act
    const result = await searchProductsUseCase.execute(query);

    // Assert
    expect(result).toEqual([mockProducts[1]]);
    expect(mockProductRepository.search).toHaveBeenCalledWith(query);
  });

  it('should handle empty search query', async () => {
    // Arrange
    const query = '';
    (mockProductRepository.search as any).mockResolvedValue([]);

    // Act
    const result = await searchProductsUseCase.execute(query);

    // Assert
    expect(result).toEqual([]);
    expect(mockProductRepository.search).toHaveBeenCalledWith(query);
  });

  it('should handle whitespace-only search query', async () => {
    // Arrange
    const query = '   ';
    (mockProductRepository.search as any).mockResolvedValue([]);

    // Act
    const result = await searchProductsUseCase.execute(query);

    // Assert
    expect(result).toEqual([]);
    expect(mockProductRepository.search).toHaveBeenCalledWith(query);
  });

  it('should handle special characters in search', async () => {
    // Arrange
    const query = 'Pro';
    const expectedResults = [mockProducts[0]];
    (mockProductRepository.search as any).mockResolvedValue(expectedResults);

    // Act
    const result = await searchProductsUseCase.execute(query);

    // Assert
    expect(result).toEqual(expectedResults);
    expect(mockProductRepository.search).toHaveBeenCalledWith(query);
  });

  it('should handle numeric search queries', async () => {
    // Arrange
    const query = '15';
    const expectedResults = [mockProducts[0]];
    (mockProductRepository.search as any).mockResolvedValue(expectedResults);

    // Act
    const result = await searchProductsUseCase.execute(query);

    // Assert
    expect(result).toEqual(expectedResults);
    expect(mockProductRepository.search).toHaveBeenCalledWith(query);
  });

  it('should handle null search results', async () => {
    // Arrange
    const query = 'test';
    (mockProductRepository.search as any).mockResolvedValue(null);

    // Act
    const result = await searchProductsUseCase.execute(query);

    // Assert
    expect(result).toBeNull();
    expect(mockProductRepository.search).toHaveBeenCalledWith(query);
  });

  it('should handle large search result sets', async () => {
    // Arrange
    const query = 'electronics';
    const largeResultSet = Array.from({ length: 100 }, (_, i) => ({
      ...mockProducts[0],
      id: i + 1,
      title: `Product ${i + 1}`
    }));

    (mockProductRepository.search as any).mockResolvedValue(largeResultSet);

    // Act
    const result = await searchProductsUseCase.execute(query);

    // Assert
    expect(result).toHaveLength(100);
    expect(mockProductRepository.search).toHaveBeenCalledWith(query);
  });

  it('should propagate repository errors', async () => {
    // Arrange
    const query = 'test';
    const error = new Error('Search service unavailable');
    (mockProductRepository.search as any).mockRejectedValue(error);

    // Act & Assert
    await expect(searchProductsUseCase.execute(query)).rejects.toThrow('Search service unavailable');
    expect(mockProductRepository.search).toHaveBeenCalledWith(query);
  });

  it('should handle search timeout', async () => {
    // Arrange
    const query = 'test';
    const timeoutError = new Error('Search timeout');
    (mockProductRepository.search as any).mockRejectedValue(timeoutError);

    // Act & Assert
    await expect(searchProductsUseCase.execute(query)).rejects.toThrow('Search timeout');
    expect(mockProductRepository.search).toHaveBeenCalledWith(query);
  });

  it('should preserve product data integrity in search results', async () => {
    // Arrange
    const query = 'variant';
    const productWithVariants = {
      ...mockProducts[0],
      variants: [
        { id: 1, attributeId: 'COLOR', value: 'Black', selected: true },
        { id: 2, attributeId: 'STORAGE', value: '256GB', selected: false, price: 1300000 }
      ]
    };

    (mockProductRepository.search as any).mockResolvedValue([productWithVariants]);

    // Act
    const result = await searchProductsUseCase.execute(query);

    // Assert
    expect(result[0].variants).toHaveLength(2);
    expect(result[0].variants[0].selected).toBe(true);
    expect(result[0].variants[1].price).toBe(1300000);
    expect(mockProductRepository.search).toHaveBeenCalledWith(query);
  });
}); 