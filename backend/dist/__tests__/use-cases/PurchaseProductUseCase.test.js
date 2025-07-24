"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const PurchaseProductUseCase_1 = require("../../application/use-cases/PurchaseProductUseCase");
// Mock repository
const mockProductRepository = {
    findAll: vitest_1.vi.fn(),
    findById: vitest_1.vi.fn(),
    findByCategory: vitest_1.vi.fn(),
    search: vitest_1.vi.fn(),
    getProductComments: vitest_1.vi.fn(),
    saveProducts: vitest_1.vi.fn()
};
const mockProduct = {
    id: 1,
    title: 'Test Product',
    price: 100,
    availableQuantity: 5,
    description: 'Test description',
    soldQuantity: 10
};
(0, vitest_1.describe)('PurchaseProductUseCase', () => {
    let purchaseUseCase;
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vi.clearAllMocks();
        purchaseUseCase = new PurchaseProductUseCase_1.PurchaseProductUseCase(mockProductRepository);
    });
    (0, vitest_1.it)('should successfully purchase product when stock is available', async () => {
        // Arrange
        mockProductRepository.findById.mockResolvedValue(mockProduct);
        // Act
        const result = await purchaseUseCase.execute(1, 2);
        // Assert
        (0, vitest_1.expect)(result.success).toBe(true);
        (0, vitest_1.expect)(result.product).toBeDefined();
        (0, vitest_1.expect)(result.product.availableQuantity).toBe(3); // 5 - 2 = 3
        (0, vitest_1.expect)(mockProductRepository.findById).toHaveBeenCalledWith(1);
    });
    (0, vitest_1.it)('should fail when product is not found', async () => {
        // Arrange
        mockProductRepository.findById.mockResolvedValue(null);
        // Act
        const result = await purchaseUseCase.execute(999, 1);
        // Assert
        (0, vitest_1.expect)(result.success).toBe(false);
        (0, vitest_1.expect)(result.message).toBe('Product not found');
        (0, vitest_1.expect)(result.product).toBeUndefined();
    });
    (0, vitest_1.it)('should fail when insufficient stock', async () => {
        // Arrange
        const lowStockProduct = { ...mockProduct, availableQuantity: 2 };
        mockProductRepository.findById.mockResolvedValue(lowStockProduct);
        // Act
        const result = await purchaseUseCase.execute(1, 5);
        // Assert
        (0, vitest_1.expect)(result.success).toBe(false);
        (0, vitest_1.expect)(result.message).toBe('Not enough stock');
        (0, vitest_1.expect)(result.product).toBeUndefined();
    });
    (0, vitest_1.it)('should fail when availableQuantity is not a number', async () => {
        // Arrange
        const invalidProduct = { ...mockProduct, availableQuantity: 'invalid' };
        mockProductRepository.findById.mockResolvedValue(invalidProduct);
        // Act
        const result = await purchaseUseCase.execute(1, 1);
        // Assert
        (0, vitest_1.expect)(result.success).toBe(false);
        (0, vitest_1.expect)(result.message).toBe('Not enough stock');
    });
    (0, vitest_1.it)('should call saveProducts when repository supports it', async () => {
        // Arrange
        const repositoryWithSave = {
            ...mockProductRepository,
            saveProducts: vitest_1.vi.fn()
        };
        const useCase = new PurchaseProductUseCase_1.PurchaseProductUseCase(repositoryWithSave);
        mockProductRepository.findById.mockResolvedValue(mockProduct);
        // Act
        await useCase.execute(1, 1);
        // Assert
        (0, vitest_1.expect)(repositoryWithSave.saveProducts).toHaveBeenCalled();
    });
    (0, vitest_1.it)('should handle zero quantity gracefully', async () => {
        // Arrange
        const freshMockProduct = { ...mockProduct, availableQuantity: 5 };
        mockProductRepository.findById.mockResolvedValue(freshMockProduct);
        // Act
        const result = await purchaseUseCase.execute(1, 0);
        // Assert
        (0, vitest_1.expect)(result.success).toBe(true);
        (0, vitest_1.expect)(result.product.availableQuantity).toBe(5); // No change
    });
    (0, vitest_1.it)('should handle string product ID', async () => {
        // Arrange
        mockProductRepository.findById.mockResolvedValue(mockProduct);
        // Act
        const result = await purchaseUseCase.execute('1', 1);
        // Assert
        (0, vitest_1.expect)(result.success).toBe(true);
        (0, vitest_1.expect)(mockProductRepository.findById).toHaveBeenCalledWith('1');
    });
});
