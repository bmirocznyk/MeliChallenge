"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const JsonProductRepository_1 = require("../../infrastructure/repositories/JsonProductRepository");
const fs_1 = require("fs");
// Mock fs modules
vitest_1.vi.mock('fs');
const mockProducts = [
    {
        id: 1,
        title: 'iPhone 15 Pro',
        price: 1800000,
        currency: 'ARS',
        condition: 'new',
        availableQuantity: 5,
        brand: 'Apple',
        model: 'iPhone 15 Pro',
        description: 'Latest iPhone with Pro features',
        categories: [{ id: '1', name: 'Electronics', path: '/electronics' }],
        images: [{ id: '1', url: 'iphone.jpg', alt: 'iPhone 15 Pro' }],
        sellerId: 1,
        paymentMethodIds: [1, 2, 3],
        reviews: { rating: 4.8, totalReviews: 250 },
        attributes: [
            { id: 'brand', name: 'Brand', value: 'Apple' },
            { id: 'model', name: 'Model', value: 'iPhone 15 Pro' }
        ],
        variants: [
            { id: 'color_black', attributeId: 'COLOR', value: 'Black', selected: true, available: true }
        ],
        installments: { quantity: 12, amount: 150000, totalAmount: 1800000, interestRate: 0, isFree: true }
    },
    {
        id: 2,
        title: 'Samsung Galaxy S24',
        price: 1500000,
        currency: 'ARS',
        condition: 'new',
        availableQuantity: 8,
        brand: 'Samsung',
        model: 'Galaxy S24',
        description: 'Premium Samsung smartphone',
        categories: [{ id: '1', name: 'Electronics', path: '/electronics' }],
        images: [{ id: '2', url: 'samsung.jpg', alt: 'Samsung Galaxy S24' }],
        sellerId: 2,
        paymentMethodIds: [1, 2, 4],
        reviews: { rating: 4.6, totalReviews: 180 },
        attributes: [
            { id: 'brand', name: 'Brand', value: 'Samsung' },
            { id: 'model', name: 'Model', value: 'Galaxy S24' }
        ],
        variants: [],
        installments: { quantity: 12, amount: 125000, totalAmount: 1500000, interestRate: 0, isFree: true }
    }
];
(0, vitest_1.describe)('JsonProductRepository', () => {
    let repository;
    let mockReadFileSync;
    (0, vitest_1.beforeEach)(() => {
        mockReadFileSync = vitest_1.vi.mocked(fs_1.readFileSync);
        // Mock successful file reads
        mockReadFileSync.mockReturnValue(JSON.stringify(mockProducts));
        repository = new JsonProductRepository_1.JsonProductRepository();
    });
    (0, vitest_1.afterEach)(() => {
        vitest_1.vi.clearAllMocks();
    });
    (0, vitest_1.describe)('constructor', () => {
        (0, vitest_1.it)('should load products from JSON file on initialization', () => {
            // Act
            new JsonProductRepository_1.JsonProductRepository();
            // Assert
            (0, vitest_1.expect)(mockReadFileSync).toHaveBeenCalledTimes(2); // Once in beforeEach, once in test
            (0, vitest_1.expect)(mockReadFileSync).toHaveBeenCalledWith(vitest_1.expect.stringContaining('products.json'), 'utf-8');
        });
        (0, vitest_1.it)('should handle file read errors gracefully', () => {
            // Arrange
            mockReadFileSync.mockImplementation(() => {
                throw new Error('File not found');
            });
            // Act & Assert
            (0, vitest_1.expect)(() => new JsonProductRepository_1.JsonProductRepository()).not.toThrow();
        });
        (0, vitest_1.it)('should handle invalid JSON gracefully', () => {
            // Arrange
            mockReadFileSync.mockReturnValue('invalid json');
            // Act
            const repo = new JsonProductRepository_1.JsonProductRepository();
            // Assert
            (0, vitest_1.expect)(repo).toBeDefined();
            // Should not throw error, should set products to empty array
        });
    });
    (0, vitest_1.describe)('findById', () => {
        (0, vitest_1.it)('should return product when found with number ID', async () => {
            // Act
            const result = await repository.findById(1);
            // Assert
            (0, vitest_1.expect)(result).toEqual(mockProducts[0]);
            (0, vitest_1.expect)(result?.id).toBe(1);
            (0, vitest_1.expect)(result?.title).toBe('iPhone 15 Pro');
        });
        (0, vitest_1.it)('should return product when found with string ID', async () => {
            // Act
            const result = await repository.findById('1');
            // Assert
            (0, vitest_1.expect)(result).toEqual(mockProducts[0]);
            (0, vitest_1.expect)(result?.id).toBe(1);
        });
        (0, vitest_1.it)('should return null when product not found', async () => {
            // Act
            const result = await repository.findById(999);
            // Assert
            (0, vitest_1.expect)(result).toBeNull();
        });
        (0, vitest_1.it)('should handle string ID that matches', async () => {
            // Act
            const result = await repository.findById('2');
            // Assert
            (0, vitest_1.expect)(result).toEqual(mockProducts[1]);
            (0, vitest_1.expect)(result?.title).toBe('Samsung Galaxy S24');
        });
        (0, vitest_1.it)('should handle non-existent string ID', async () => {
            // Act
            const result = await repository.findById('999');
            // Assert
            (0, vitest_1.expect)(result).toBeNull();
        });
        (0, vitest_1.it)('should handle edge case IDs', async () => {
            // Act & Assert
            (0, vitest_1.expect)(await repository.findById(0)).toBeNull();
            (0, vitest_1.expect)(await repository.findById(-1)).toBeNull();
            (0, vitest_1.expect)(await repository.findById('')).toBeNull();
            (0, vitest_1.expect)(await repository.findById('abc')).toBeNull();
        });
    });
});
