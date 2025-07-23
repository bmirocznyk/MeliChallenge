"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const JsonProductRepository_1 = require("../../infrastructure/repositories/JsonProductRepository");
const fs_1 = require("fs");
const promises_1 = __importDefault(require("fs/promises"));
// Mock fs modules
vitest_1.vi.mock('fs');
vitest_1.vi.mock('fs/promises');
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
const mockComments = {
    '1': [
        { id: 1, userId: 1, username: 'user1', rating: 5, comment: 'Excellent phone!', date: '2024-01-01', verified: true, helpful: 10 },
        { id: 2, userId: 2, username: 'user2', rating: 4, comment: 'Good quality', date: '2024-01-02', verified: true, helpful: 5 }
    ],
    '2': [
        { id: 3, userId: 3, username: 'user3', rating: 5, comment: 'Great Samsung phone', date: '2024-01-03', verified: true, helpful: 8 }
    ]
};
(0, vitest_1.describe)('JsonProductRepository', () => {
    let repository;
    let mockReadFileSync;
    let mockWriteFile;
    let mockReadFile;
    (0, vitest_1.beforeEach)(() => {
        mockReadFileSync = vitest_1.vi.mocked(fs_1.readFileSync);
        mockWriteFile = vitest_1.vi.mocked(promises_1.default.writeFile);
        mockReadFile = vitest_1.vi.mocked(promises_1.default.readFile);
        // Mock successful file reads
        mockReadFileSync.mockReturnValue(JSON.stringify(mockProducts));
        mockReadFile.mockResolvedValue(JSON.stringify(mockComments));
        mockWriteFile.mockResolvedValue(undefined);
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
            (0, vitest_1.expect)(mockReadFileSync).toHaveBeenCalledTimes(1);
            (0, vitest_1.expect)(mockReadFileSync).toHaveBeenCalledWith(vitest_1.expect.stringContaining('products.json'), 'utf-8');
        });
        (0, vitest_1.it)('should handle file read errors gracefully', () => {
            // Arrange
            mockReadFileSync.mockImplementation(() => {
                throw new Error('File not found');
            });
            // Act
            const repo = new JsonProductRepository_1.JsonProductRepository();
            // Assert
            (0, vitest_1.expect)(repo).toBeDefined();
            // Should not throw error, should set products to empty array
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
    (0, vitest_1.describe)('findAll', () => {
        (0, vitest_1.it)('should return all products', async () => {
            // Act
            const result = await repository.findAll();
            // Assert
            (0, vitest_1.expect)(result).toEqual(mockProducts);
            (0, vitest_1.expect)(result).toHaveLength(2);
        });
        (0, vitest_1.it)('should return empty array when no products exist', async () => {
            // Arrange
            mockReadFileSync.mockReturnValue('[]');
            const emptyRepo = new JsonProductRepository_1.JsonProductRepository();
            // Act
            const result = await emptyRepo.findAll();
            // Assert
            (0, vitest_1.expect)(result).toEqual([]);
            (0, vitest_1.expect)(result).toHaveLength(0);
        });
        (0, vitest_1.it)('should return a copy of products array', async () => {
            // Act
            const result1 = await repository.findAll();
            const result2 = await repository.findAll();
            // Assert
            (0, vitest_1.expect)(result1).toEqual(result2);
            (0, vitest_1.expect)(result1).not.toBe(result2); // Different array instances
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
    (0, vitest_1.describe)('findByCategory', () => {
        (0, vitest_1.it)('should return products by category ID', async () => {
            // Act
            const result = await repository.findByCategory('1');
            // Assert
            (0, vitest_1.expect)(result).toHaveLength(2);
            (0, vitest_1.expect)(result.every(p => p.categories.some(c => c.id === '1'))).toBe(true);
        });
        (0, vitest_1.it)('should return products by numeric category ID', async () => {
            // Act
            const result = await repository.findByCategory(1);
            // Assert
            (0, vitest_1.expect)(result).toHaveLength(2);
            (0, vitest_1.expect)(result.every(p => p.categories.some(c => c.id == 1))).toBe(true);
        });
        (0, vitest_1.it)('should return empty array for non-existent category', async () => {
            // Act
            const result = await repository.findByCategory('999');
            // Assert
            (0, vitest_1.expect)(result).toEqual([]);
            (0, vitest_1.expect)(result).toHaveLength(0);
        });
        (0, vitest_1.it)('should handle products with multiple categories', async () => {
            // Arrange
            const productWithMultipleCategories = {
                ...mockProducts[0],
                categories: [
                    { id: '1', name: 'Electronics', path: '/electronics' },
                    { id: '2', name: 'Mobile', path: '/mobile' }
                ]
            };
            mockReadFileSync.mockReturnValue(JSON.stringify([productWithMultipleCategories]));
            const repoWithMultiCat = new JsonProductRepository_1.JsonProductRepository();
            // Act
            const result1 = await repoWithMultiCat.findByCategory('1');
            const result2 = await repoWithMultiCat.findByCategory('2');
            // Assert
            (0, vitest_1.expect)(result1).toHaveLength(1);
            (0, vitest_1.expect)(result2).toHaveLength(1);
        });
        (0, vitest_1.it)('should handle products with no categories', async () => {
            // Arrange
            const productWithNoCategories = { ...mockProducts[0], categories: [] };
            mockReadFileSync.mockReturnValue(JSON.stringify([productWithNoCategories]));
            const repoWithNoCat = new JsonProductRepository_1.JsonProductRepository();
            // Act
            const result = await repoWithNoCat.findByCategory('1');
            // Assert
            (0, vitest_1.expect)(result).toEqual([]);
        });
    });
    (0, vitest_1.describe)('search', () => {
        (0, vitest_1.it)('should find products by title (case insensitive)', async () => {
            // Act
            const result = await repository.search('iphone');
            // Assert
            (0, vitest_1.expect)(result).toHaveLength(1);
            (0, vitest_1.expect)(result[0].title).toContain('iPhone');
        });
        (0, vitest_1.it)('should find products by title (exact case)', async () => {
            // Act
            const result = await repository.search('iPhone');
            // Assert
            (0, vitest_1.expect)(result).toHaveLength(1);
            (0, vitest_1.expect)(result[0].title).toContain('iPhone');
        });
        (0, vitest_1.it)('should find products by description', async () => {
            // Act
            const result = await repository.search('smartphone');
            // Assert
            (0, vitest_1.expect)(result).toHaveLength(1);
            (0, vitest_1.expect)(result[0].title).toContain('Samsung');
        });
        (0, vitest_1.it)('should find multiple products with common terms', async () => {
            // Act
            const result = await repository.search('phone'); // Should match both iPhone and smartphone
            // Assert
            (0, vitest_1.expect)(result).toHaveLength(2);
        });
        (0, vitest_1.it)('should return empty array for non-matching search', async () => {
            // Act
            const result = await repository.search('nonexistent');
            // Assert
            (0, vitest_1.expect)(result).toEqual([]);
            (0, vitest_1.expect)(result).toHaveLength(0);
        });
        (0, vitest_1.it)('should handle empty search query', async () => {
            // Act
            const result = await repository.search('');
            // Assert
            (0, vitest_1.expect)(result).toEqual([]);
        });
        (0, vitest_1.it)('should handle whitespace-only search query', async () => {
            // Act
            const result = await repository.search('   ');
            // Assert
            (0, vitest_1.expect)(result).toEqual([]);
        });
        (0, vitest_1.it)('should search in both title and description', async () => {
            // Arrange
            const specialProduct = {
                ...mockProducts[0],
                title: 'Special Device',
                description: 'A unique gadget with amazing features'
            };
            mockReadFileSync.mockReturnValue(JSON.stringify([specialProduct]));
            const specialRepo = new JsonProductRepository_1.JsonProductRepository();
            // Act
            const titleResult = await specialRepo.search('Special');
            const descResult = await specialRepo.search('unique');
            // Assert
            (0, vitest_1.expect)(titleResult).toHaveLength(1);
            (0, vitest_1.expect)(descResult).toHaveLength(1);
        });
        (0, vitest_1.it)('should handle special characters in search', async () => {
            // Act
            const result = await repository.search('Pro');
            // Assert
            (0, vitest_1.expect)(result).toHaveLength(1);
            (0, vitest_1.expect)(result[0].title).toContain('Pro');
        });
    });
    (0, vitest_1.describe)('getProductComments', () => {
        (0, vitest_1.it)('should return comments for existing product', async () => {
            // Act
            const result = await repository.getProductComments(1);
            // Assert
            (0, vitest_1.expect)(result).toEqual(mockComments['1']);
            (0, vitest_1.expect)(result).toHaveLength(2);
            (0, vitest_1.expect)(mockReadFile).toHaveBeenCalledWith(vitest_1.expect.stringContaining('comments.json'), 'utf-8');
        });
        (0, vitest_1.it)('should return comments for string product ID', async () => {
            // Act
            const result = await repository.getProductComments('1');
            // Assert
            (0, vitest_1.expect)(result).toEqual(mockComments['1']);
            (0, vitest_1.expect)(result).toHaveLength(2);
        });
        (0, vitest_1.it)('should return empty array for product with no comments', async () => {
            // Act
            const result = await repository.getProductComments(999);
            // Assert
            (0, vitest_1.expect)(result).toEqual([]);
        });
        (0, vitest_1.it)('should handle comments file read errors', async () => {
            // Arrange
            mockReadFile.mockRejectedValue(new Error('File not found'));
            // Act & Assert
            await (0, vitest_1.expect)(repository.getProductComments(1)).rejects.toThrow('File not found');
        });
        (0, vitest_1.it)('should handle invalid JSON in comments file', async () => {
            // Arrange
            mockReadFile.mockResolvedValue('invalid json');
            // Act & Assert
            await (0, vitest_1.expect)(repository.getProductComments(1)).rejects.toThrow();
        });
    });
    (0, vitest_1.describe)('saveProducts', () => {
        (0, vitest_1.it)('should save products to file', async () => {
            // Act
            await repository.saveProducts();
            // Assert
            (0, vitest_1.expect)(mockWriteFile).toHaveBeenCalledWith(vitest_1.expect.stringContaining('products.json'), vitest_1.expect.stringContaining('"title":"iPhone 15 Pro"'), 'utf-8');
        });
        (0, vitest_1.it)('should save formatted JSON', async () => {
            // Act
            await repository.saveProducts();
            // Assert
            (0, vitest_1.expect)(mockWriteFile).toHaveBeenCalledWith(vitest_1.expect.any(String), vitest_1.expect.stringMatching(/\{\s+/), // Should be formatted with spaces
            'utf-8');
        });
        (0, vitest_1.it)('should handle file write errors', async () => {
            // Arrange
            mockWriteFile.mockRejectedValue(new Error('Write permission denied'));
            // Act & Assert
            await (0, vitest_1.expect)(repository.saveProducts()).rejects.toThrow('Write permission denied');
        });
    });
    (0, vitest_1.describe)('data consistency', () => {
        (0, vitest_1.it)('should maintain data integrity after multiple operations', async () => {
            // Act
            const allProducts = await repository.findAll();
            const productById = await repository.findById(1);
            const searchResults = await repository.search('iPhone');
            // Assert
            (0, vitest_1.expect)(allProducts).toContain(productById);
            (0, vitest_1.expect)(searchResults).toContain(productById);
            (0, vitest_1.expect)(allProducts[0]).toEqual(productById);
        });
        (0, vitest_1.it)('should handle concurrent access safely', async () => {
            // Act
            const promises = [
                repository.findAll(),
                repository.findById(1),
                repository.search('iPhone'),
                repository.findByCategory('1')
            ];
            const results = await Promise.all(promises);
            // Assert
            (0, vitest_1.expect)(results).toHaveLength(4);
            (0, vitest_1.expect)(results[0]).toHaveLength(2); // findAll
            (0, vitest_1.expect)(results[1]).toBeTruthy(); // findById
            (0, vitest_1.expect)(results[2]).toHaveLength(1); // search
            (0, vitest_1.expect)(results[3]).toHaveLength(2); // findByCategory
        });
    });
});
