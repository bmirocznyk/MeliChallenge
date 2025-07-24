import { describe, it, expect, beforeEach, vi } from 'vitest';
import { GetProductUseCase } from '../../application/use-cases/GetProductUseCase';
import { ProductRepository } from '../../domain/repositories/ProductRepository';
import { Product } from '../../shared/types/product';

// Mock repository
const mockProductRepository = {
  findById: vi.fn() as any
};

const mockProduct: Product = {
  id: 1,
  title: 'iPhone 15 Pro',
  price: 1200000,
  currency: 'ARS',
  condition: 'new',
  availableQuantity: 10,
  brand: 'Apple',
  model: 'iPhone 15 Pro',
  description: 'El iPhone más potente hasta ahora',
  categories: [{ id: 1, name: 'Smartphones', path: '/smartphones' }],
  images: [
    { id: 1, url: '/product-images/iphone15/iphone1.jpg', alt: 'iPhone 15 Pro - Vista frontal' },
    { id: 2, url: '/product-images/iphone15/iphone2.webp', alt: 'iPhone 15 Pro - Vista trasera' },
    { id: 3, url: '/product-images/iphone15/iphone3.png', alt: 'iPhone 15 Pro - Vista lateral' }
  ],
  sellerId: 1,
  paymentMethodIds: [1, 2, 3, 4, 5, 7, 8],
  reviews: { rating: 4.8, totalReviews: 127 },
  attributes: [],
  variants: [],
  installments: { quantity: 12, amount: 100000, isFree: true }
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
        { id: '1', attributeId: 'COLOR', value: 'Black', selected: true, available: true },
        { id: '2', attributeId: 'STORAGE', value: '256GB', selected: false, available: true, price: 1300000 }
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
}); 