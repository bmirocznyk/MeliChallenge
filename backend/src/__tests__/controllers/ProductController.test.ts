import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Request, Response } from 'express';
import { ProductController } from '../../interfaces/controllers/ProductController';

// Mock the use cases and repositories
vi.mock('../../application/use-cases/GetProductUseCase');
vi.mock('../../application/use-cases/GetPaymentMethodsUseCase');
vi.mock('../../application/use-cases/GetSellerUseCase');
vi.mock('../../infrastructure/repositories/JsonProductRepository');
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

    it('should handle errors gracefully', async () => {
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

  describe('getPaymentMethods', () => {
    it('should return all payment methods', async () => {
      // Arrange
      const mockExecute = vi.fn().mockResolvedValue(mockPaymentMethods);
      (productController as any).getPaymentMethodsUseCase = { execute: mockExecute };

      // Act
      await productController.getPaymentMethods(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockExecute).toHaveBeenCalled();
      expect(mockJson).toHaveBeenCalledWith(mockPaymentMethods);
    });

    it('should handle errors gracefully', async () => {
      // Arrange
      const mockExecute = vi.fn().mockRejectedValue(new Error('Database error'));
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
      mockRequest.query = { ids: '1,2' };
      
      const mockExecuteByIds = vi.fn().mockResolvedValue(mockPaymentMethods);
      (productController as any).getPaymentMethodsUseCase = { executeByIds: mockExecuteByIds };

      // Act
      await productController.getPaymentMethodsByIds(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockExecuteByIds).toHaveBeenCalledWith([1, 2]);
      expect(mockJson).toHaveBeenCalledWith(mockPaymentMethods);
    });

    it('should return 400 when IDs parameter is missing', async () => {
      // Arrange
      mockRequest.query = {};

      // Act
      await productController.getPaymentMethodsByIds(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({ error: 'Payment method IDs are required' });
    });

    it('should handle errors gracefully', async () => {
      // Arrange
      mockRequest.query = { ids: '1,2' };
      
      const mockExecuteByIds = vi.fn().mockRejectedValue(new Error('Database error'));
      (productController as any).getPaymentMethodsUseCase = { executeByIds: mockExecuteByIds };

      // Act
      await productController.getPaymentMethodsByIds(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });

  describe('getProductWithPaymentMethods', () => {
    it('should return product with payment methods', async () => {
      // Arrange
      mockRequest.params = { id: '1' };
      
      const mockGetProductExecute = vi.fn().mockResolvedValue(mockProduct);
      const mockGetPaymentMethodsExecuteByIds = vi.fn().mockResolvedValue(mockPaymentMethods);
      
      (productController as any).getProductUseCase = { execute: mockGetProductExecute };
      (productController as any).getPaymentMethodsUseCase = { executeByIds: mockGetPaymentMethodsExecuteByIds };

      // Act
      await productController.getProductWithPaymentMethods(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockGetProductExecute).toHaveBeenCalledWith('1');
      expect(mockGetPaymentMethodsExecuteByIds).toHaveBeenCalledWith([1, 2]);
      expect(mockJson).toHaveBeenCalledWith({
        ...mockProduct,
        paymentMethods: mockPaymentMethods
      });
    });

    it('should return 404 when product not found', async () => {
      // Arrange
      mockRequest.params = { id: '999' };
      
      const mockExecute = vi.fn().mockResolvedValue(null);
      (productController as any).getProductUseCase = { execute: mockExecute };

      // Act
      await productController.getProductWithPaymentMethods(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith({ error: 'Product not found' });
    });

    it('should handle errors gracefully', async () => {
      // Arrange
      mockRequest.params = { id: '1' };
      
      const mockExecute = vi.fn().mockRejectedValue(new Error('Database error'));
      (productController as any).getProductUseCase = { execute: mockExecute };

      // Act
      await productController.getProductWithPaymentMethods(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({ error: 'Internal server error' });
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
      expect(mockStatus).not.toHaveBeenCalled();
    });

    it('should return 404 when seller not found', async () => {
      // Arrange
      mockRequest.params = { id: '999' };
      
      const mockExecute = vi.fn().mockResolvedValue(null);
      (productController as any).getSellerUseCase = { execute: mockExecute };

      // Act
      await productController.getSeller(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockExecute).toHaveBeenCalledWith('999');
      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith({ error: 'Seller not found' });
    });

    it('should handle errors gracefully', async () => {
      // Arrange
      mockRequest.params = { id: '1' };
      
      const mockExecute = vi.fn().mockRejectedValue(new Error('Database error'));
      (productController as any).getSellerUseCase = { execute: mockExecute };

      // Act
      await productController.getSeller(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });
}); 