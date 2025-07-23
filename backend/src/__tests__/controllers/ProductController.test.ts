import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Request, Response } from 'express';
import { ProductController } from '../../interfaces/controllers/ProductController';

// Mock the use cases and repositories
vi.mock('../../application/use-cases/GetAllProductsUseCase');
vi.mock('../../application/use-cases/GetProductUseCase');
vi.mock('../../application/use-cases/SearchProductsUseCase');
vi.mock('../../application/use-cases/GetProductCommentsUseCase');
vi.mock('../../application/use-cases/GetPaymentMethodsUseCase');
vi.mock('../../application/use-cases/GetSellerUseCase');
vi.mock('../../infrastructure/repositories/JsonProductRepository');
vi.mock('../../infrastructure/repositories/JsonCommentRepository');
vi.mock('../../infrastructure/repositories/JsonPaymentMethodRepository');
vi.mock('../../infrastructure/repositories/JsonSellerRepository');

const mockProduct = {
  id: 1,
  title: 'Test iPhone 15',
  price: 1500000,
  currency: 'ARS',
  condition: 'new',
  availableQuantity: 10,
  description: 'Test description',
  categories: [{ id: '1', name: 'Electronics' }],
  images: [],
  sellerId: 1,
  paymentMethodIds: [1, 2],
  reviews: { rating: 4.5, totalReviews: 100 },
  attributes: [],
  variants: [],
  installments: { quantity: 12, amount: 125000, totalAmount: 1500000, interestRate: 0, isFree: true }
};

const mockSeller = {
  id: 1,
  name: 'Test Seller',
  reputation: 'green',
  level: 'gold',
  sales: 1000,
  isOfficialStore: true
};

const mockPaymentMethods = [
  { id: 1, name: 'Visa', type: 'credit_card', category: 'Credit Cards', icon: 'visa.png' },
  { id: 2, name: 'MasterCard', type: 'credit_card', category: 'Credit Cards', icon: 'mastercard.png' }
];

const mockComments = [
  { id: 1, userId: 1, username: 'user1', rating: 5, comment: 'Great product!', date: '2024-01-01' }
];

describe('ProductController', () => {
  let productController: ProductController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockJson: any;
  let mockStatus: any;

  beforeEach(() => {
    mockJson = vi.fn();
    mockStatus = vi.fn().mockReturnValue({ json: mockJson });
    
    mockRequest = {};
    mockResponse = {
      json: mockJson,
      status: mockStatus
    };

    productController = new ProductController();
  });

  describe('getProduct', () => {
    it('should return product when found', async () => {
      // Arrange
      mockRequest.params = { id: '1' };
      
      // Mock the use case to return a product
      const mockExecute = vi.fn().mockResolvedValue(mockProduct);
      (productController as any).getProductUseCase = { execute: mockExecute };

      // Act
      await productController.getProduct(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockExecute).toHaveBeenCalledWith('1');
      expect(mockJson).toHaveBeenCalledWith(mockProduct);
      expect(mockStatus).not.toHaveBeenCalled();
    });

    it('should return 404 when product not found', async () => {
      // Arrange
      mockRequest.params = { id: '999' };
      
      const mockExecute = vi.fn().mockResolvedValue(null);
      (productController as any).getProductUseCase = { execute: mockExecute };

      // Act
      await productController.getProduct(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockExecute).toHaveBeenCalledWith('999');
      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith({
        error: 'Product not found',
        message: 'Product with id 999 was not found'
      });
    });

    it('should return 500 when use case throws error', async () => {
      // Arrange
      mockRequest.params = { id: '1' };
      
      const mockExecute = vi.fn().mockRejectedValue(new Error('Database error'));
      (productController as any).getProductUseCase = { execute: mockExecute };

      // Act
      await productController.getProduct(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({
        error: 'Internal server error',
        message: 'An error occurred while retrieving the product'
      });
    });
  });

  describe('getAllProducts', () => {
    it('should return all products', async () => {
      // Arrange
      const mockProducts = [mockProduct];
      const mockExecute = vi.fn().mockResolvedValue(mockProducts);
      (productController as any).getAllProductsUseCase = { execute: mockExecute };

      // Act
      await productController.getAllProducts(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockExecute).toHaveBeenCalledWith();
      expect(mockJson).toHaveBeenCalledWith(mockProducts);
    });

    it('should return empty array when no products exist', async () => {
      // Arrange
      const mockExecute = vi.fn().mockResolvedValue([]);
      (productController as any).getAllProductsUseCase = { execute: mockExecute };

      // Act
      await productController.getAllProducts(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockJson).toHaveBeenCalledWith([]);
    });

    it('should handle use case errors', async () => {
      // Arrange
      const mockExecute = vi.fn().mockRejectedValue(new Error('Database connection failed'));
      (productController as any).getAllProductsUseCase = { execute: mockExecute };

      // Act
      await productController.getAllProducts(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({
        error: 'Internal server error',
        message: 'An error occurred while retrieving products'
      });
    });
  });

  describe('searchProducts', () => {
    it('should return search results for valid query', async () => {
      // Arrange
      mockRequest.query = { q: 'iPhone' };
      const searchResults = [mockProduct];
      const mockExecute = vi.fn().mockResolvedValue(searchResults);
      (productController as any).searchProductsUseCase = { execute: mockExecute };

      // Act
      await productController.searchProducts(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockExecute).toHaveBeenCalledWith('iPhone');
      expect(mockJson).toHaveBeenCalledWith(searchResults);
    });

    it('should return 400 when query parameter is missing', async () => {
      // Arrange
      mockRequest.query = {};

      // Act
      await productController.searchProducts(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({
        error: 'Bad request',
        message: 'Search query parameter "q" is required'
      });
    });

    it('should return 400 when query parameter is not a string', async () => {
      // Arrange
      mockRequest.query = { q: '123' as any };

      // Act
      await productController.searchProducts(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({
        error: 'Bad request',
        message: 'Search query parameter "q" is required'
      });
    });

    it('should handle search use case errors', async () => {
      // Arrange
      mockRequest.query = { q: 'iPhone' };
      const mockExecute = vi.fn().mockRejectedValue(new Error('Search service down'));
      (productController as any).searchProductsUseCase = { execute: mockExecute };

      // Act
      await productController.searchProducts(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({
        error: 'Internal server error',
        message: 'An error occurred while searching products'
      });
    });
  });

  describe('getProductComments', () => {
    it('should return product comments and summary', async () => {
      // Arrange
      mockRequest.params = { id: '1' };
      const mockExecute = vi.fn().mockResolvedValue(mockComments);
      const mockGetReviewSummary = vi.fn().mockResolvedValue({ averageRating: 4.5, totalReviews: 1 });
      (productController as any).getProductCommentsUseCase = { 
        execute: mockExecute,
        getReviewSummary: mockGetReviewSummary
      };

      // Act
      await productController.getProductComments(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockExecute).toHaveBeenCalledWith('1');
      expect(mockGetReviewSummary).toHaveBeenCalledWith('1');
      expect(mockJson).toHaveBeenCalledWith({
        comments: mockComments,
        summary: { averageRating: 4.5, totalReviews: 1 }
      });
    });

    it('should handle comments use case errors', async () => {
      // Arrange
      mockRequest.params = { id: '1' };
      const mockExecute = vi.fn().mockRejectedValue(new Error('Comments service error'));
      (productController as any).getProductCommentsUseCase = { execute: mockExecute };

      // Act
      await productController.getProductComments(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({
        error: 'Internal server error',
        message: 'An error occurred while retrieving product comments'
      });
    });
  });

  describe('getPaymentMethods', () => {
    it('should return all payment methods', async () => {
      // Arrange
      const mockExecute = vi.fn().mockResolvedValue(mockPaymentMethods);
      (productController as any).getPaymentMethodsUseCase = { execute: mockExecute };

      // Act
      await productController.getPaymentMethods(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockExecute).toHaveBeenCalledWith();
      expect(mockJson).toHaveBeenCalledWith(mockPaymentMethods);
    });

    it('should handle payment methods errors', async () => {
      // Arrange
      const mockExecute = vi.fn().mockRejectedValue(new Error('Payment service error'));
      (productController as any).getPaymentMethodsUseCase = { execute: mockExecute };

      // Act
      await productController.getPaymentMethods(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });

  describe('getPaymentMethodsByIds', () => {
    it('should return payment methods by IDs', async () => {
      // Arrange
      mockRequest.query = { ids: '1,2,3' };
      const mockExecuteByIds = vi.fn().mockResolvedValue(mockPaymentMethods);
      (productController as any).getPaymentMethodsUseCase = { executeByIds: mockExecuteByIds };

      // Act
      await productController.getPaymentMethodsByIds(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockExecuteByIds).toHaveBeenCalledWith([1, 2, 3]);
      expect(mockJson).toHaveBeenCalledWith(mockPaymentMethods);
    });

    it('should return 400 when ids parameter is missing', async () => {
      // Arrange
      mockRequest.query = {};

      // Act
      await productController.getPaymentMethodsByIds(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({ error: 'Payment method IDs are required' });
    });

    it('should handle invalid ID format', async () => {
      // Arrange
      mockRequest.query = { ids: 'invalid' };
      const mockExecuteByIds = vi.fn().mockResolvedValue([]);
      (productController as any).getPaymentMethodsUseCase = { executeByIds: mockExecuteByIds };

      // Act
      await productController.getPaymentMethodsByIds(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockExecuteByIds).toHaveBeenCalledWith([NaN]);
      expect(mockJson).toHaveBeenCalledWith([]);
    });
  });

  describe('getSeller', () => {
    it('should return seller when found', async () => {
      // Arrange
      mockRequest.params = { id: '1' };
      const mockExecute = vi.fn().mockResolvedValue(mockSeller);
      (productController as any).getSellerUseCase = { execute: mockExecute };

      // Act
      await productController.getSeller(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockExecute).toHaveBeenCalledWith('1');
      expect(mockJson).toHaveBeenCalledWith(mockSeller);
    });

    it('should return 404 when seller not found', async () => {
      // Arrange
      mockRequest.params = { id: '999' };
      const mockExecute = vi.fn().mockResolvedValue(null);
      (productController as any).getSellerUseCase = { execute: mockExecute };

      // Act
      await productController.getSeller(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith({ error: 'Seller not found' });
    });
  });

  describe('getAllSellers', () => {
    it('should return all sellers', async () => {
      // Arrange
      const sellers = [mockSeller];
      const mockExecuteAll = vi.fn().mockResolvedValue(sellers);
      (productController as any).getSellerUseCase = { executeAll: mockExecuteAll };

      // Act
      await productController.getAllSellers(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockExecuteAll).toHaveBeenCalledWith();
      expect(mockJson).toHaveBeenCalledWith(sellers);
    });
  });

  describe('getSellersByIds', () => {
    it('should return sellers by IDs', async () => {
      // Arrange
      mockRequest.query = { ids: '1,2' };
      const sellers = [mockSeller];
      const mockExecuteByIds = vi.fn().mockResolvedValue(sellers);
      (productController as any).getSellerUseCase = { executeByIds: mockExecuteByIds };

      // Act
      await productController.getSellersByIds(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockExecuteByIds).toHaveBeenCalledWith(['1', '2']);
      expect(mockJson).toHaveBeenCalledWith(sellers);
    });

    it('should return 400 when ids parameter is missing', async () => {
      // Arrange
      mockRequest.query = {};

      // Act
      await productController.getSellersByIds(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({ error: 'IDs parameter is required' });
    });
  });
}); 