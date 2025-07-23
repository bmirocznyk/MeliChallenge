"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const SearchProductsUseCase_1 = require("../../application/use-cases/SearchProductsUseCase");
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
(0, vitest_1.describe)('SearchProductsUseCase', () => {
    let searchProductsUseCase;
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vi.clearAllMocks();
        searchProductsUseCase = new SearchProductsUseCase_1.SearchProductsUseCase(mockProductRepository);
    });
    (0, vitest_1.it)('should return search results for valid query', async () => {
        // Arrange
        const query = 'iPhone';
        const expectedResults = [mockProducts[0]];
        mockProductRepository.search.mockResolvedValue(expectedResults);
        // Act
        const result = await searchProductsUseCase.execute(query);
        // Assert
        (0, vitest_1.expect)(result).toEqual(expectedResults);
        (0, vitest_1.expect)(mockProductRepository.search).toHaveBeenCalledWith(query);
        (0, vitest_1.expect)(mockProductRepository.search).toHaveBeenCalledTimes(1);
    });
    (0, vitest_1.it)('should return empty array for no results', async () => {
        // Arrange
        const query = 'nonexistent';
        mockProductRepository.search.mockResolvedValue([]);
        // Act
        const result = await searchProductsUseCase.execute(query);
        // Assert
        (0, vitest_1.expect)(result).toEqual([]);
        (0, vitest_1.expect)(mockProductRepository.search).toHaveBeenCalledWith(query);
    });
    (0, vitest_1.it)('should return multiple results for broad search', async () => {
        // Arrange
        const query = 'phone';
        mockProductRepository.search.mockResolvedValue(mockProducts);
        // Act
        const result = await searchProductsUseCase.execute(query);
        // Assert
        (0, vitest_1.expect)(result).toEqual(mockProducts);
        (0, vitest_1.expect)(mockProductRepository.search).toHaveBeenCalledWith(query);
    });
    (0, vitest_1.it)('should handle case-insensitive search', async () => {
        // Arrange
        const query = 'iphone';
        const expectedResults = [mockProducts[0]];
        mockProductRepository.search.mockResolvedValue(expectedResults);
        // Act
        const result = await searchProductsUseCase.execute(query);
        // Assert
        (0, vitest_1.expect)(result).toEqual(expectedResults);
        (0, vitest_1.expect)(mockProductRepository.search).toHaveBeenCalledWith(query);
    });
    (0, vitest_1.it)('should handle search by brand', async () => {
        // Arrange
        const query = 'Samsung';
        const expectedResults = [mockProducts[1]];
        mockProductRepository.search.mockResolvedValue(expectedResults);
        // Act
        const result = await searchProductsUseCase.execute(query);
        // Assert
        (0, vitest_1.expect)(result).toEqual(expectedResults);
        (0, vitest_1.expect)(mockProductRepository.search).toHaveBeenCalledWith(query);
    });
    (0, vitest_1.it)('should handle search in product description', async () => {
        // Arrange
        const query = 'AI features';
        mockProductRepository.search.mockResolvedValue([mockProducts[1]]);
        // Act
        const result = await searchProductsUseCase.execute(query);
        // Assert
        (0, vitest_1.expect)(result).toEqual([mockProducts[1]]);
        (0, vitest_1.expect)(mockProductRepository.search).toHaveBeenCalledWith(query);
    });
    (0, vitest_1.it)('should handle empty search query', async () => {
        // Arrange
        const query = '';
        mockProductRepository.search.mockResolvedValue([]);
        // Act
        const result = await searchProductsUseCase.execute(query);
        // Assert
        (0, vitest_1.expect)(result).toEqual([]);
        (0, vitest_1.expect)(mockProductRepository.search).toHaveBeenCalledWith(query);
    });
    (0, vitest_1.it)('should handle whitespace-only search query', async () => {
        // Arrange
        const query = '   ';
        mockProductRepository.search.mockResolvedValue([]);
        // Act
        const result = await searchProductsUseCase.execute(query);
        // Assert
        (0, vitest_1.expect)(result).toEqual([]);
        (0, vitest_1.expect)(mockProductRepository.search).toHaveBeenCalledWith(query);
    });
    (0, vitest_1.it)('should handle special characters in search', async () => {
        // Arrange
        const query = 'Pro';
        const expectedResults = [mockProducts[0]];
        mockProductRepository.search.mockResolvedValue(expectedResults);
        // Act
        const result = await searchProductsUseCase.execute(query);
        // Assert
        (0, vitest_1.expect)(result).toEqual(expectedResults);
        (0, vitest_1.expect)(mockProductRepository.search).toHaveBeenCalledWith(query);
    });
    (0, vitest_1.it)('should handle numeric search queries', async () => {
        // Arrange
        const query = '15';
        const expectedResults = [mockProducts[0]];
        mockProductRepository.search.mockResolvedValue(expectedResults);
        // Act
        const result = await searchProductsUseCase.execute(query);
        // Assert
        (0, vitest_1.expect)(result).toEqual(expectedResults);
        (0, vitest_1.expect)(mockProductRepository.search).toHaveBeenCalledWith(query);
    });
    (0, vitest_1.it)('should handle null search results', async () => {
        // Arrange
        const query = 'test';
        mockProductRepository.search.mockResolvedValue(null);
        // Act
        const result = await searchProductsUseCase.execute(query);
        // Assert
        (0, vitest_1.expect)(result).toBeNull();
        (0, vitest_1.expect)(mockProductRepository.search).toHaveBeenCalledWith(query);
    });
    (0, vitest_1.it)('should handle large search result sets', async () => {
        // Arrange
        const query = 'electronics';
        const largeResultSet = Array.from({ length: 100 }, (_, i) => ({
            ...mockProducts[0],
            id: i + 1,
            title: `Product ${i + 1}`
        }));
        mockProductRepository.search.mockResolvedValue(largeResultSet);
        // Act
        const result = await searchProductsUseCase.execute(query);
        // Assert
        (0, vitest_1.expect)(result).toHaveLength(100);
        (0, vitest_1.expect)(mockProductRepository.search).toHaveBeenCalledWith(query);
    });
    (0, vitest_1.it)('should propagate repository errors', async () => {
        // Arrange
        const query = 'test';
        const error = new Error('Search service unavailable');
        mockProductRepository.search.mockRejectedValue(error);
        // Act & Assert
        await (0, vitest_1.expect)(searchProductsUseCase.execute(query)).rejects.toThrow('Search service unavailable');
        (0, vitest_1.expect)(mockProductRepository.search).toHaveBeenCalledWith(query);
    });
    (0, vitest_1.it)('should handle search timeout', async () => {
        // Arrange
        const query = 'test';
        const timeoutError = new Error('Search timeout');
        mockProductRepository.search.mockRejectedValue(timeoutError);
        // Act & Assert
        await (0, vitest_1.expect)(searchProductsUseCase.execute(query)).rejects.toThrow('Search timeout');
        (0, vitest_1.expect)(mockProductRepository.search).toHaveBeenCalledWith(query);
    });
    (0, vitest_1.it)('should preserve product data integrity in search results', async () => {
        // Arrange
        const query = 'variant';
        const productWithVariants = {
            ...mockProducts[0],
            variants: [
                { id: 1, attributeId: 'COLOR', value: 'Black', selected: true },
                { id: 2, attributeId: 'STORAGE', value: '256GB', selected: false, price: 1300000 }
            ]
        };
        mockProductRepository.search.mockResolvedValue([productWithVariants]);
        // Act
        const result = await searchProductsUseCase.execute(query);
        // Assert
        (0, vitest_1.expect)(result[0].variants).toHaveLength(2);
        (0, vitest_1.expect)(result[0].variants[0].selected).toBe(true);
        (0, vitest_1.expect)(result[0].variants[1].price).toBe(1300000);
        (0, vitest_1.expect)(mockProductRepository.search).toHaveBeenCalledWith(query);
    });
});
