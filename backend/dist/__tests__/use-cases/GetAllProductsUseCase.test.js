"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const GetAllProductsUseCase_1 = require("../../application/use-cases/GetAllProductsUseCase");
const mockProductRepository = {
    findAll: vitest_1.vi.fn(),
    findById: vitest_1.vi.fn(),
    findByCategory: vitest_1.vi.fn(),
    search: vitest_1.vi.fn(),
    getProductComments: vitest_1.vi.fn(),
    saveProducts: vitest_1.vi.fn(),
};
const mockProducts = [
    {
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
    },
    {
        id: 2,
        title: 'Samsung Galaxy S24',
        price: 980000,
        currency: 'ARS',
        condition: 'new',
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
(0, vitest_1.describe)('GetAllProductsUseCase', () => {
    let getAllProductsUseCase;
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vi.clearAllMocks();
        getAllProductsUseCase = new GetAllProductsUseCase_1.GetAllProductsUseCase(mockProductRepository);
    });
    (0, vitest_1.it)('should return all products', async () => {
        // Arrange
        mockProductRepository.findAll.mockResolvedValue(mockProducts);
        // Act
        const result = await getAllProductsUseCase.execute();
        // Assert
        (0, vitest_1.expect)(result).toEqual(mockProducts);
        (0, vitest_1.expect)(mockProductRepository.findAll).toHaveBeenCalledTimes(1);
    });
    (0, vitest_1.it)('should return empty array when no products exist', async () => {
        // Arrange
        mockProductRepository.findAll.mockResolvedValue([]);
        // Act
        const result = await getAllProductsUseCase.execute();
        // Assert
        (0, vitest_1.expect)(result).toEqual([]);
        (0, vitest_1.expect)(mockProductRepository.findAll).toHaveBeenCalledTimes(1);
    });
    (0, vitest_1.it)('should handle large product datasets', async () => {
        // Arrange
        const largeProductSet = Array.from({ length: 100 }, (_, i) => ({
            ...mockProducts[0],
            id: i + 1,
            title: `Product ${i + 1}`
        }));
        mockProductRepository.findAll.mockResolvedValue(largeProductSet);
        // Act
        const result = await getAllProductsUseCase.execute();
        // Assert
        (0, vitest_1.expect)(result).toHaveLength(100);
        (0, vitest_1.expect)(mockProductRepository.findAll).toHaveBeenCalledTimes(1);
    });
    (0, vitest_1.it)('should preserve product data integrity', async () => {
        // Arrange
        const productWithVariants = {
            ...mockProducts[0],
            variants: [
                { id: 1, attributeId: 'COLOR', value: 'Black', selected: true },
                { id: 2, attributeId: 'STORAGE', value: '256GB', selected: false, price: 1300000 }
            ]
        };
        mockProductRepository.findAll.mockResolvedValue([productWithVariants]);
        // Act
        const result = await getAllProductsUseCase.execute();
        // Assert
        (0, vitest_1.expect)(result[0].variants).toHaveLength(2);
        (0, vitest_1.expect)(result[0].variants[0].selected).toBe(true);
        (0, vitest_1.expect)(result[0].variants[1].price).toBe(1300000);
        (0, vitest_1.expect)(mockProductRepository.findAll).toHaveBeenCalledTimes(1);
    });
    (0, vitest_1.it)('should propagate repository errors', async () => {
        // Arrange
        const error = new Error('Database connection failed');
        mockProductRepository.findAll.mockRejectedValue(error);
        // Act & Assert
        await (0, vitest_1.expect)(getAllProductsUseCase.execute()).rejects.toThrow('Database connection failed');
        (0, vitest_1.expect)(mockProductRepository.findAll).toHaveBeenCalledTimes(1);
    });
    (0, vitest_1.it)('should use injected repository for findAll operations', () => {
        // Arrange & Act
        const useCase = new GetAllProductsUseCase_1.GetAllProductsUseCase(mockProductRepository);
        // Assert
        (0, vitest_1.expect)(useCase.repository).toBe(mockProductRepository);
    });
});
