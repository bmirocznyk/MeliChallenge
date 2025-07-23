import { describe, it, expect, beforeEach, vi } from 'vitest';
import { PurchaseProductUseCase } from '../../application/use-cases/PurchaseProductUseCase';
import { ProductRepository } from '../../domain/repositories/ProductRepository';

// Mock repository
const mockProductRepository = {
  findAll: vi.fn() as any,
  findById: vi.fn() as any,
  findByCategory: vi.fn() as any,
  search: vi.fn() as any,
  getProductComments: vi.fn() as any,
  saveProducts: vi.fn() as any
};

const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 100,
  availableQuantity: 5,
  description: 'Test description',
  soldQuantity: 10
};

describe('PurchaseProductUseCase', () => {
  let purchaseUseCase: PurchaseProductUseCase;

  beforeEach(() => {
    vi.clearAllMocks();
    purchaseUseCase = new PurchaseProductUseCase(mockProductRepository);
  });

  it('should successfully purchase product when stock is available', async () => {
    // Arrange
    mockProductRepository.findById.mockResolvedValue(mockProduct);

    // Act
    const result = await purchaseUseCase.execute(1, 2);

    // Assert
    expect(result.success).toBe(true);
    expect(result.product).toBeDefined();
    expect(result.product.availableQuantity).toBe(3); // 5 - 2 = 3
    expect(mockProductRepository.findById).toHaveBeenCalledWith(1);
  });

  it('should fail when product is not found', async () => {
    // Arrange
    mockProductRepository.findById.mockResolvedValue(null);

    // Act
    const result = await purchaseUseCase.execute(999, 1);

    // Assert
    expect(result.success).toBe(false);
    expect(result.message).toBe('Product not found');
    expect(result.product).toBeUndefined();
  });

  it('should fail when insufficient stock', async () => {
    // Arrange
    const lowStockProduct = { ...mockProduct, availableQuantity: 2 };
    mockProductRepository.findById.mockResolvedValue(lowStockProduct);

    // Act
    const result = await purchaseUseCase.execute(1, 5);

    // Assert
    expect(result.success).toBe(false);
    expect(result.message).toBe('Not enough stock');
    expect(result.product).toBeUndefined();
  });

  it('should fail when availableQuantity is not a number', async () => {
    // Arrange
    const invalidProduct = { ...mockProduct, availableQuantity: 'invalid' as any };
    mockProductRepository.findById.mockResolvedValue(invalidProduct);

    // Act
    const result = await purchaseUseCase.execute(1, 1);

    // Assert
    expect(result.success).toBe(false);
    expect(result.message).toBe('Not enough stock');
  });

  it('should call saveProducts when repository supports it', async () => {
    // Arrange
    const repositoryWithSave = {
      ...mockProductRepository,
      saveProducts: vi.fn()
    } as any;
    
    const useCase = new PurchaseProductUseCase(repositoryWithSave);
    mockProductRepository.findById.mockResolvedValue(mockProduct);

    // Act
    await useCase.execute(1, 1);

    // Assert
    expect(repositoryWithSave.saveProducts).toHaveBeenCalled();
  });

  it('should handle zero quantity gracefully', async () => {
    // Arrange
    mockProductRepository.findById.mockResolvedValue(mockProduct);

    // Act
    const result = await purchaseUseCase.execute(1, 0);

    // Assert
    expect(result.success).toBe(true);
    expect(result.product.availableQuantity).toBe(5); // No change
  });

  it('should handle string product ID', async () => {
    // Arrange
    mockProductRepository.findById.mockResolvedValue(mockProduct);

    // Act
    const result = await purchaseUseCase.execute('1', 1);

    // Assert
    expect(result.success).toBe(true);
    expect(mockProductRepository.findById).toHaveBeenCalledWith('1');
  });
}); 