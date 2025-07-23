"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const GetProductUseCase_1 = require("../../application/use-cases/GetProductUseCase");
const mockProductRepository = {
    findAll: vitest_1.vi.fn(),
    findById: vitest_1.vi.fn(),
    findByCategory: vitest_1.vi.fn(),
    search: vitest_1.vi.fn(),
    getProductComments: vitest_1.vi.fn(),
    saveProducts: vitest_1.vi.fn(),
};
const mockProduct = {
    id: 1,
    title: 'iPhone 15 Pro',
    price: 1200000,
    currency: 'ARS',
    condition: 'new',
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
(0, vitest_1.describe)('GetProductUseCase', () => {
    let getProductUseCase;
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vi.clearAllMocks();
        getProductUseCase = new GetProductUseCase_1.GetProductUseCase(mockProductRepository);
    });
    (0, vitest_1.it)('should return product when found by ID', async () => {
        // Arrange
        const productId = 1;
        mockProductRepository.findById.mockResolvedValue(mockProduct);
        // Act
        const result = await getProductUseCase.execute(productId);
        // Assert
        (0, vitest_1.expect)(result).toEqual(mockProduct);
        (0, vitest_1.expect)(mockProductRepository.findById).toHaveBeenCalledWith(productId);
        (0, vitest_1.expect)(mockProductRepository.findById).toHaveBeenCalledTimes(1);
    });
    (0, vitest_1.it)('should return null when product not found', async () => {
        // Arrange
        const productId = 999;
        mockProductRepository.findById.mockResolvedValue(null);
        // Act
        const result = await getProductUseCase.execute(productId);
        // Assert
        (0, vitest_1.expect)(result).toBeNull();
        (0, vitest_1.expect)(mockProductRepository.findById).toHaveBeenCalledWith(productId);
    });
    (0, vitest_1.it)('should handle string ID parameter', async () => {
        // Arrange
        const productId = '1';
        mockProductRepository.findById.mockResolvedValue(mockProduct);
        // Act
        const result = await getProductUseCase.execute(productId);
        // Assert
        (0, vitest_1.expect)(result).toEqual(mockProduct);
        (0, vitest_1.expect)(mockProductRepository.findById).toHaveBeenCalledWith(productId);
    });
    (0, vitest_1.it)('should propagate repository errors', async () => {
        // Arrange
        const productId = 1;
        const error = new Error('Database connection failed');
        mockProductRepository.findById.mockRejectedValue(error);
        // Act & Assert
        await (0, vitest_1.expect)(getProductUseCase.execute(productId)).rejects.toThrow('Database connection failed');
        (0, vitest_1.expect)(mockProductRepository.findById).toHaveBeenCalledWith(productId);
    });
    (0, vitest_1.it)('should handle product with variants', async () => {
        // Arrange
        const productId = 1;
        const productWithVariants = {
            ...mockProduct,
            variants: [
                { id: 1, attributeId: 'COLOR', value: 'Black', selected: true },
                { id: 2, attributeId: 'STORAGE', value: '256GB', selected: false, price: 1300000 }
            ]
        };
        mockProductRepository.findById.mockResolvedValue(productWithVariants);
        // Act
        const result = await getProductUseCase.execute(productId);
        // Assert
        (0, vitest_1.expect)(result).toEqual(productWithVariants);
        (0, vitest_1.expect)(result.variants).toHaveLength(2);
        (0, vitest_1.expect)(mockProductRepository.findById).toHaveBeenCalledWith(productId);
    });
    (0, vitest_1.it)('should handle product with attributes', async () => {
        // Arrange
        const productId = 1;
        const productWithAttributes = {
            ...mockProduct,
            attributes: [
                { id: 'brand', name: 'Brand', value: 'Apple' },
                { id: 'model', name: 'Model', value: 'iPhone 15 Pro' }
            ]
        };
        mockProductRepository.findById.mockResolvedValue(productWithAttributes);
        // Act
        const result = await getProductUseCase.execute(productId);
        // Assert
        (0, vitest_1.expect)(result).toEqual(productWithAttributes);
        (0, vitest_1.expect)(result.attributes).toHaveLength(2);
        (0, vitest_1.expect)(mockProductRepository.findById).toHaveBeenCalledWith(productId);
    });
    (0, vitest_1.it)('should use injected repository for findById operations', () => {
        // Arrange & Act
        const useCase = new GetProductUseCase_1.GetProductUseCase(mockProductRepository);
        // Assert
        (0, vitest_1.expect)(useCase.repository).toBe(mockProductRepository);
    });
});
