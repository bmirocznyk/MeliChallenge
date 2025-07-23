import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { JsonProductRepository } from '../../infrastructure/repositories/JsonProductRepository';
import { readFileSync } from 'fs';
import fs from 'fs/promises';

// Mock fs modules
vi.mock('fs');
vi.mock('fs/promises');

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

describe('JsonProductRepository', () => {
  let repository: JsonProductRepository;
  let mockReadFileSync: any;
  let mockWriteFile: any;
  let mockReadFile: any;

  beforeEach(() => {
    mockReadFileSync = vi.mocked(readFileSync);
    mockWriteFile = vi.mocked(fs.writeFile);
    mockReadFile = vi.mocked(fs.readFile);

    // Mock successful file reads
    mockReadFileSync.mockReturnValue(JSON.stringify(mockProducts));
    mockReadFile.mockResolvedValue(JSON.stringify(mockComments));
    mockWriteFile.mockResolvedValue(undefined);

    repository = new JsonProductRepository();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('constructor', () => {
    it('should load products from JSON file on initialization', () => {
      // Act
      new JsonProductRepository();

      // Assert
      expect(mockReadFileSync).toHaveBeenCalledTimes(1);
      expect(mockReadFileSync).toHaveBeenCalledWith(
        expect.stringContaining('products.json'),
        'utf-8'
      );
    });

    it('should handle file read errors gracefully', () => {
      // Arrange
      mockReadFileSync.mockImplementation(() => {
        throw new Error('File not found');
      });

      // Act
      const repo = new JsonProductRepository();

      // Assert
      expect(repo).toBeDefined();
      // Should not throw error, should set products to empty array
    });

    it('should handle invalid JSON gracefully', () => {
      // Arrange
      mockReadFileSync.mockReturnValue('invalid json');

      // Act
      const repo = new JsonProductRepository();

      // Assert
      expect(repo).toBeDefined();
      // Should not throw error, should set products to empty array
    });
  });

  describe('findAll', () => {
    it('should return all products', async () => {
      // Act
      const result = await repository.findAll();

      // Assert
      expect(result).toEqual(mockProducts);
      expect(result).toHaveLength(2);
    });

    it('should return empty array when no products exist', async () => {
      // Arrange
      mockReadFileSync.mockReturnValue('[]');
      const emptyRepo = new JsonProductRepository();

      // Act
      const result = await emptyRepo.findAll();

      // Assert
      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it('should return a copy of products array', async () => {
      // Act
      const result1 = await repository.findAll();
      const result2 = await repository.findAll();

      // Assert
      expect(result1).toEqual(result2);
      expect(result1).not.toBe(result2); // Different array instances
    });
  });

  describe('findById', () => {
    it('should return product when found with number ID', async () => {
      // Act
      const result = await repository.findById(1);

      // Assert
      expect(result).toEqual(mockProducts[0]);
      expect(result?.id).toBe(1);
      expect(result?.title).toBe('iPhone 15 Pro');
    });

    it('should return product when found with string ID', async () => {
      // Act
      const result = await repository.findById('1');

      // Assert
      expect(result).toEqual(mockProducts[0]);
      expect(result?.id).toBe(1);
    });

    it('should return null when product not found', async () => {
      // Act
      const result = await repository.findById(999);

      // Assert
      expect(result).toBeNull();
    });

    it('should handle string ID that matches', async () => {
      // Act
      const result = await repository.findById('2');

      // Assert
      expect(result).toEqual(mockProducts[1]);
      expect(result?.title).toBe('Samsung Galaxy S24');
    });

    it('should handle non-existent string ID', async () => {
      // Act
      const result = await repository.findById('999');

      // Assert
      expect(result).toBeNull();
    });

    it('should handle edge case IDs', async () => {
      // Act & Assert
      expect(await repository.findById(0)).toBeNull();
      expect(await repository.findById(-1)).toBeNull();
      expect(await repository.findById('')).toBeNull();
      expect(await repository.findById('abc')).toBeNull();
    });
  });

  describe('findByCategory', () => {
    it('should return products by category ID', async () => {
      // Act
      const result = await repository.findByCategory('1');

      // Assert
      expect(result).toHaveLength(2);
      expect(result.every(p => p.categories.some(c => c.id === '1'))).toBe(true);
    });

    it('should return products by numeric category ID', async () => {
      // Act
      const result = await repository.findByCategory(1);

      // Assert
      expect(result).toHaveLength(2);
      expect(result.every(p => p.categories.some(c => c.id == 1))).toBe(true);
    });

    it('should return empty array for non-existent category', async () => {
      // Act
      const result = await repository.findByCategory('999');

      // Assert
      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it('should handle products with multiple categories', async () => {
      // Arrange
      const productWithMultipleCategories = {
        ...mockProducts[0],
        categories: [
          { id: '1', name: 'Electronics', path: '/electronics' },
          { id: '2', name: 'Mobile', path: '/mobile' }
        ]
      };
      mockReadFileSync.mockReturnValue(JSON.stringify([productWithMultipleCategories]));
      const repoWithMultiCat = new JsonProductRepository();

      // Act
      const result1 = await repoWithMultiCat.findByCategory('1');
      const result2 = await repoWithMultiCat.findByCategory('2');

      // Assert
      expect(result1).toHaveLength(1);
      expect(result2).toHaveLength(1);
    });

    it('should handle products with no categories', async () => {
      // Arrange
      const productWithNoCategories = { ...mockProducts[0], categories: [] };
      mockReadFileSync.mockReturnValue(JSON.stringify([productWithNoCategories]));
      const repoWithNoCat = new JsonProductRepository();

      // Act
      const result = await repoWithNoCat.findByCategory('1');

      // Assert
      expect(result).toEqual([]);
    });
  });

  describe('search', () => {
    it('should find products by title (case insensitive)', async () => {
      // Act
      const result = await repository.search('iphone');

      // Assert
      expect(result).toHaveLength(1);
      expect(result[0].title).toContain('iPhone');
    });

    it('should find products by title (exact case)', async () => {
      // Act
      const result = await repository.search('iPhone');

      // Assert
      expect(result).toHaveLength(1);
      expect(result[0].title).toContain('iPhone');
    });

    it('should find products by description', async () => {
      // Act
      const result = await repository.search('smartphone');

      // Assert
      expect(result).toHaveLength(1);
      expect(result[0].title).toContain('Samsung');
    });

    it('should find multiple products with common terms', async () => {
      // Act
      const result = await repository.search('phone'); // Should match both iPhone and smartphone

      // Assert
      expect(result).toHaveLength(2);
    });

    it('should return empty array for non-matching search', async () => {
      // Act
      const result = await repository.search('nonexistent');

      // Assert
      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it('should handle empty search query', async () => {
      // Act
      const result = await repository.search('');

      // Assert
      expect(result).toEqual([]);
    });

    it('should handle whitespace-only search query', async () => {
      // Act
      const result = await repository.search('   ');

      // Assert
      expect(result).toEqual([]);
    });

    it('should search in both title and description', async () => {
      // Arrange
      const specialProduct = {
        ...mockProducts[0],
        title: 'Special Device',
        description: 'A unique gadget with amazing features'
      };
      mockReadFileSync.mockReturnValue(JSON.stringify([specialProduct]));
      const specialRepo = new JsonProductRepository();

      // Act
      const titleResult = await specialRepo.search('Special');
      const descResult = await specialRepo.search('unique');

      // Assert
      expect(titleResult).toHaveLength(1);
      expect(descResult).toHaveLength(1);
    });

    it('should handle special characters in search', async () => {
      // Act
      const result = await repository.search('Pro');

      // Assert
      expect(result).toHaveLength(1);
      expect(result[0].title).toContain('Pro');
    });
  });

  describe('getProductComments', () => {
    it('should return comments for existing product', async () => {
      // Act
      const result = await repository.getProductComments(1);

      // Assert
      expect(result).toEqual(mockComments['1']);
      expect(result).toHaveLength(2);
      expect(mockReadFile).toHaveBeenCalledWith(
        expect.stringContaining('comments.json'),
        'utf-8'
      );
    });

    it('should return comments for string product ID', async () => {
      // Act
      const result = await repository.getProductComments('1');

      // Assert
      expect(result).toEqual(mockComments['1']);
      expect(result).toHaveLength(2);
    });

    it('should return empty array for product with no comments', async () => {
      // Act
      const result = await repository.getProductComments(999);

      // Assert
      expect(result).toEqual([]);
    });

    it('should handle comments file read errors', async () => {
      // Arrange
      mockReadFile.mockRejectedValue(new Error('File not found'));

      // Act & Assert
      await expect(repository.getProductComments(1)).rejects.toThrow('File not found');
    });

    it('should handle invalid JSON in comments file', async () => {
      // Arrange
      mockReadFile.mockResolvedValue('invalid json');

      // Act & Assert
      await expect(repository.getProductComments(1)).rejects.toThrow();
    });
  });

  describe('saveProducts', () => {
    it('should save products to file', async () => {
      // Act
      await repository.saveProducts();

      // Assert
      expect(mockWriteFile).toHaveBeenCalledWith(
        expect.stringContaining('products.json'),
        expect.stringContaining('"title":"iPhone 15 Pro"'),
        'utf-8'
      );
    });

    it('should save formatted JSON', async () => {
      // Act
      await repository.saveProducts();

      // Assert
      expect(mockWriteFile).toHaveBeenCalledWith(
        expect.any(String),
        expect.stringMatching(/\{\s+/), // Should be formatted with spaces
        'utf-8'
      );
    });

    it('should handle file write errors', async () => {
      // Arrange
      mockWriteFile.mockRejectedValue(new Error('Write permission denied'));

      // Act & Assert
      await expect(repository.saveProducts()).rejects.toThrow('Write permission denied');
    });
  });

  describe('data consistency', () => {
    it('should maintain data integrity after multiple operations', async () => {
      // Act
      const allProducts = await repository.findAll();
      const productById = await repository.findById(1);
      const searchResults = await repository.search('iPhone');

      // Assert
      expect(allProducts).toContain(productById);
      expect(searchResults).toContain(productById);
      expect(allProducts[0]).toEqual(productById);
    });

    it('should handle concurrent access safely', async () => {
      // Act
      const promises = [
        repository.findAll(),
        repository.findById(1),
        repository.search('iPhone'),
        repository.findByCategory('1')
      ];
      
      const results = await Promise.all(promises);

      // Assert
      expect(results).toHaveLength(4);
      expect(results[0]).toHaveLength(2); // findAll
      expect(results[1]).toBeTruthy(); // findById
      expect(results[2]).toHaveLength(1); // search
      expect(results[3]).toHaveLength(2); // findByCategory
    });
  });
}); 