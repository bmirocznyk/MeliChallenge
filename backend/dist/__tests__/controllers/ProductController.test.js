"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const ProductController_1 = require("../../interfaces/controllers/ProductController");
// Mock the use cases and repositories
vitest_1.vi.mock('../../application/use-cases/GetProductUseCase');
vitest_1.vi.mock('../../application/use-cases/GetPaymentMethodsUseCase');
vitest_1.vi.mock('../../application/use-cases/GetSellerUseCase');
vitest_1.vi.mock('../../infrastructure/repositories/JsonProductRepository');
vitest_1.vi.mock('../../infrastructure/repositories/JsonPaymentMethodRepository');
vitest_1.vi.mock('../../infrastructure/repositories/JsonSellerRepository');
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
(0, vitest_1.describe)('ProductController', () => {
    let productController;
    let mockRequest;
    let mockResponse;
    let mockJson;
    let mockStatus;
    (0, vitest_1.beforeEach)(() => {
        mockJson = vitest_1.vi.fn();
        mockStatus = vitest_1.vi.fn().mockReturnValue({ json: mockJson });
        mockRequest = {};
        mockResponse = {
            json: mockJson,
            status: mockStatus
        };
        productController = new ProductController_1.ProductController();
    });
    (0, vitest_1.describe)('getProduct', () => {
        (0, vitest_1.it)('should return product when found', async () => {
            // Arrange
            mockRequest.params = { id: '1' };
            // Mock the use case to return a product
            const mockExecute = vitest_1.vi.fn().mockResolvedValue(mockProduct);
            productController.getProductUseCase = { execute: mockExecute };
            // Act
            await productController.getProduct(mockRequest, mockResponse);
            // Assert
            (0, vitest_1.expect)(mockExecute).toHaveBeenCalledWith('1');
            (0, vitest_1.expect)(mockJson).toHaveBeenCalledWith(mockProduct);
            (0, vitest_1.expect)(mockStatus).not.toHaveBeenCalled();
        });
        (0, vitest_1.it)('should return 404 when product not found', async () => {
            // Arrange
            mockRequest.params = { id: '999' };
            const mockExecute = vitest_1.vi.fn().mockResolvedValue(null);
            productController.getProductUseCase = { execute: mockExecute };
            // Act
            await productController.getProduct(mockRequest, mockResponse);
            // Assert
            (0, vitest_1.expect)(mockExecute).toHaveBeenCalledWith('999');
            (0, vitest_1.expect)(mockStatus).toHaveBeenCalledWith(404);
            (0, vitest_1.expect)(mockJson).toHaveBeenCalledWith({
                error: 'Product not found',
                message: 'Product with id 999 was not found'
            });
        });
        (0, vitest_1.it)('should handle errors gracefully', async () => {
            // Arrange
            mockRequest.params = { id: '1' };
            const mockExecute = vitest_1.vi.fn().mockRejectedValue(new Error('Database error'));
            productController.getProductUseCase = { execute: mockExecute };
            // Act
            await productController.getProduct(mockRequest, mockResponse);
            // Assert
            (0, vitest_1.expect)(mockStatus).toHaveBeenCalledWith(500);
            (0, vitest_1.expect)(mockJson).toHaveBeenCalledWith({
                error: 'Internal server error',
                message: 'An error occurred while retrieving the product'
            });
        });
    });
    (0, vitest_1.describe)('getPaymentMethods', () => {
        (0, vitest_1.it)('should return all payment methods', async () => {
            // Arrange
            const mockExecute = vitest_1.vi.fn().mockResolvedValue(mockPaymentMethods);
            productController.getPaymentMethodsUseCase = { execute: mockExecute };
            // Act
            await productController.getPaymentMethods(mockRequest, mockResponse);
            // Assert
            (0, vitest_1.expect)(mockExecute).toHaveBeenCalled();
            (0, vitest_1.expect)(mockJson).toHaveBeenCalledWith(mockPaymentMethods);
        });
        (0, vitest_1.it)('should handle errors gracefully', async () => {
            // Arrange
            const mockExecute = vitest_1.vi.fn().mockRejectedValue(new Error('Database error'));
            productController.getPaymentMethodsUseCase = { execute: mockExecute };
            // Act
            await productController.getPaymentMethods(mockRequest, mockResponse);
            // Assert
            (0, vitest_1.expect)(mockStatus).toHaveBeenCalledWith(500);
            (0, vitest_1.expect)(mockJson).toHaveBeenCalledWith({ error: 'Internal server error' });
        });
    });
    (0, vitest_1.describe)('getPaymentMethodsByIds', () => {
        (0, vitest_1.it)('should return payment methods by IDs', async () => {
            // Arrange
            mockRequest.query = { ids: '1,2' };
            const mockExecuteByIds = vitest_1.vi.fn().mockResolvedValue(mockPaymentMethods);
            productController.getPaymentMethodsUseCase = { executeByIds: mockExecuteByIds };
            // Act
            await productController.getPaymentMethodsByIds(mockRequest, mockResponse);
            // Assert
            (0, vitest_1.expect)(mockExecuteByIds).toHaveBeenCalledWith([1, 2]);
            (0, vitest_1.expect)(mockJson).toHaveBeenCalledWith(mockPaymentMethods);
        });
        (0, vitest_1.it)('should return 400 when IDs parameter is missing', async () => {
            // Arrange
            mockRequest.query = {};
            // Act
            await productController.getPaymentMethodsByIds(mockRequest, mockResponse);
            // Assert
            (0, vitest_1.expect)(mockStatus).toHaveBeenCalledWith(400);
            (0, vitest_1.expect)(mockJson).toHaveBeenCalledWith({ error: 'Payment method IDs are required' });
        });
        (0, vitest_1.it)('should handle errors gracefully', async () => {
            // Arrange
            mockRequest.query = { ids: '1,2' };
            const mockExecuteByIds = vitest_1.vi.fn().mockRejectedValue(new Error('Database error'));
            productController.getPaymentMethodsUseCase = { executeByIds: mockExecuteByIds };
            // Act
            await productController.getPaymentMethodsByIds(mockRequest, mockResponse);
            // Assert
            (0, vitest_1.expect)(mockStatus).toHaveBeenCalledWith(500);
            (0, vitest_1.expect)(mockJson).toHaveBeenCalledWith({ error: 'Internal server error' });
        });
    });
    (0, vitest_1.describe)('getProductWithPaymentMethods', () => {
        (0, vitest_1.it)('should return product with payment methods', async () => {
            // Arrange
            mockRequest.params = { id: '1' };
            const mockGetProductExecute = vitest_1.vi.fn().mockResolvedValue(mockProduct);
            const mockGetPaymentMethodsExecuteByIds = vitest_1.vi.fn().mockResolvedValue(mockPaymentMethods);
            productController.getProductUseCase = { execute: mockGetProductExecute };
            productController.getPaymentMethodsUseCase = { executeByIds: mockGetPaymentMethodsExecuteByIds };
            // Act
            await productController.getProductWithPaymentMethods(mockRequest, mockResponse);
            // Assert
            (0, vitest_1.expect)(mockGetProductExecute).toHaveBeenCalledWith('1');
            (0, vitest_1.expect)(mockGetPaymentMethodsExecuteByIds).toHaveBeenCalledWith([1, 2]);
            (0, vitest_1.expect)(mockJson).toHaveBeenCalledWith({
                ...mockProduct,
                paymentMethods: mockPaymentMethods
            });
        });
        (0, vitest_1.it)('should return 404 when product not found', async () => {
            // Arrange
            mockRequest.params = { id: '999' };
            const mockExecute = vitest_1.vi.fn().mockResolvedValue(null);
            productController.getProductUseCase = { execute: mockExecute };
            // Act
            await productController.getProductWithPaymentMethods(mockRequest, mockResponse);
            // Assert
            (0, vitest_1.expect)(mockStatus).toHaveBeenCalledWith(404);
            (0, vitest_1.expect)(mockJson).toHaveBeenCalledWith({ error: 'Product not found' });
        });
        (0, vitest_1.it)('should handle errors gracefully', async () => {
            // Arrange
            mockRequest.params = { id: '1' };
            const mockExecute = vitest_1.vi.fn().mockRejectedValue(new Error('Database error'));
            productController.getProductUseCase = { execute: mockExecute };
            // Act
            await productController.getProductWithPaymentMethods(mockRequest, mockResponse);
            // Assert
            (0, vitest_1.expect)(mockStatus).toHaveBeenCalledWith(500);
            (0, vitest_1.expect)(mockJson).toHaveBeenCalledWith({ error: 'Internal server error' });
        });
    });
    (0, vitest_1.describe)('getSeller', () => {
        (0, vitest_1.it)('should return seller when found', async () => {
            // Arrange
            mockRequest.params = { id: '1' };
            const mockExecute = vitest_1.vi.fn().mockResolvedValue(mockSeller);
            productController.getSellerUseCase = { execute: mockExecute };
            // Act
            await productController.getSeller(mockRequest, mockResponse);
            // Assert
            (0, vitest_1.expect)(mockExecute).toHaveBeenCalledWith('1');
            (0, vitest_1.expect)(mockJson).toHaveBeenCalledWith(mockSeller);
            (0, vitest_1.expect)(mockStatus).not.toHaveBeenCalled();
        });
        (0, vitest_1.it)('should return 404 when seller not found', async () => {
            // Arrange
            mockRequest.params = { id: '999' };
            const mockExecute = vitest_1.vi.fn().mockResolvedValue(null);
            productController.getSellerUseCase = { execute: mockExecute };
            // Act
            await productController.getSeller(mockRequest, mockResponse);
            // Assert
            (0, vitest_1.expect)(mockExecute).toHaveBeenCalledWith('999');
            (0, vitest_1.expect)(mockStatus).toHaveBeenCalledWith(404);
            (0, vitest_1.expect)(mockJson).toHaveBeenCalledWith({ error: 'Seller not found' });
        });
        (0, vitest_1.it)('should handle errors gracefully', async () => {
            // Arrange
            mockRequest.params = { id: '1' };
            const mockExecute = vitest_1.vi.fn().mockRejectedValue(new Error('Database error'));
            productController.getSellerUseCase = { execute: mockExecute };
            // Act
            await productController.getSeller(mockRequest, mockResponse);
            // Assert
            (0, vitest_1.expect)(mockStatus).toHaveBeenCalledWith(500);
            (0, vitest_1.expect)(mockJson).toHaveBeenCalledWith({ error: 'Internal server error' });
        });
    });
});
