"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const GetAllProductsUseCase_1 = require("../../application/use-cases/GetAllProductsUseCase");
const GetProductUseCase_1 = require("../../application/use-cases/GetProductUseCase");
const SearchProductsUseCase_1 = require("../../application/use-cases/SearchProductsUseCase");
const GetProductCommentsUseCase_1 = require("../../application/use-cases/GetProductCommentsUseCase");
const GetPaymentMethodsUseCase_1 = require("../../application/use-cases/GetPaymentMethodsUseCase");
const GetSellerUseCase_1 = require("../../application/use-cases/GetSellerUseCase");
const JsonProductRepository_1 = require("../../infrastructure/repositories/JsonProductRepository");
const JsonCommentRepository_1 = require("../../infrastructure/repositories/JsonCommentRepository");
const JsonPaymentMethodRepository_1 = require("../../infrastructure/repositories/JsonPaymentMethodRepository");
const JsonSellerRepository_1 = require("../../infrastructure/repositories/JsonSellerRepository");
class ProductController {
    getAllProductsUseCase;
    getProductUseCase;
    searchProductsUseCase;
    getProductCommentsUseCase;
    getPaymentMethodsUseCase;
    getSellerUseCase;
    constructor() {
        const productRepository = new JsonProductRepository_1.JsonProductRepository();
        const commentRepository = new JsonCommentRepository_1.JsonCommentRepository();
        const paymentMethodRepository = new JsonPaymentMethodRepository_1.JsonPaymentMethodRepository();
        const sellerRepository = new JsonSellerRepository_1.JsonSellerRepository();
        this.getAllProductsUseCase = new GetAllProductsUseCase_1.GetAllProductsUseCase(productRepository);
        this.getProductUseCase = new GetProductUseCase_1.GetProductUseCase(productRepository);
        this.searchProductsUseCase = new SearchProductsUseCase_1.SearchProductsUseCase(productRepository);
        this.getProductCommentsUseCase = new GetProductCommentsUseCase_1.GetProductCommentsUseCase(commentRepository);
        this.getPaymentMethodsUseCase = new GetPaymentMethodsUseCase_1.GetPaymentMethodsUseCase(paymentMethodRepository);
        this.getSellerUseCase = new GetSellerUseCase_1.GetSellerUseCase(sellerRepository);
    }
    async getProduct(req, res) {
        try {
            const { id } = req.params;
            const product = await this.getProductUseCase.execute(id);
            if (!product) {
                res.status(404).json({
                    error: 'Product not found',
                    message: `Product with id ${id} was not found`
                });
                return;
            }
            res.json(product);
        }
        catch (error) {
            console.error('Error getting product:', error);
            res.status(500).json({
                error: 'Internal server error',
                message: 'An error occurred while retrieving the product'
            });
        }
    }
    async getAllProducts(req, res) {
        try {
            const products = await this.getAllProductsUseCase.execute();
            res.json(products);
        }
        catch (error) {
            console.error('Error getting all products:', error);
            res.status(500).json({
                error: 'Internal server error',
                message: 'An error occurred while retrieving products'
            });
        }
    }
    async searchProducts(req, res) {
        try {
            const { q } = req.query;
            if (!q || typeof q !== 'string') {
                res.status(400).json({
                    error: 'Bad request',
                    message: 'Search query parameter "q" is required'
                });
                return;
            }
            const products = await this.searchProductsUseCase.execute(q);
            res.json(products);
        }
        catch (error) {
            console.error('Error searching products:', error);
            res.status(500).json({
                error: 'Internal server error',
                message: 'An error occurred while searching products'
            });
        }
    }
    async getProductComments(req, res) {
        try {
            const { id } = req.params;
            const comments = await this.getProductCommentsUseCase.execute(id);
            const reviewSummary = await this.getProductCommentsUseCase.getReviewSummary(id);
            res.json({
                comments,
                summary: reviewSummary
            });
        }
        catch (error) {
            console.error('Error getting product comments:', error);
            res.status(500).json({
                error: 'Internal server error',
                message: 'An error occurred while retrieving product comments'
            });
        }
    }
    async getPaymentMethods(req, res) {
        try {
            const paymentMethods = await this.getPaymentMethodsUseCase.execute();
            res.json(paymentMethods);
        }
        catch (error) {
            console.error('Error fetching payment methods:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async getPaymentMethodsByIds(req, res) {
        try {
            const { ids } = req.query;
            if (!ids || typeof ids !== 'string') {
                res.status(400).json({ error: 'Payment method IDs are required' });
                return;
            }
            const idArray = ids.split(',').map(id => parseInt(id.trim()));
            const paymentMethods = await this.getPaymentMethodsUseCase.executeByIds(idArray);
            res.json(paymentMethods);
        }
        catch (error) {
            console.error('Error fetching payment methods by IDs:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async getProductWithPaymentMethods(req, res) {
        try {
            const { id } = req.params;
            const product = await this.getProductUseCase.execute(id);
            if (!product) {
                res.status(404).json({ error: 'Product not found' });
                return;
            }
            // Fetch payment methods for this product
            const paymentMethods = await this.getPaymentMethodsUseCase.executeByIds(product.paymentMethodIds || []);
            res.json({
                ...product,
                paymentMethods
            });
        }
        catch (error) {
            console.error('Error fetching product with payment methods:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async getSeller(req, res) {
        try {
            const { id } = req.params;
            const seller = await this.getSellerUseCase.execute(id);
            if (!seller) {
                res.status(404).json({ error: 'Seller not found' });
                return;
            }
            res.json(seller);
        }
        catch (error) {
            console.error('Error fetching seller:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async getAllSellers(req, res) {
        try {
            const sellers = await this.getSellerUseCase.executeAll();
            res.json(sellers);
        }
        catch (error) {
            console.error('Error fetching sellers:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async getSellersByIds(req, res) {
        try {
            const { ids } = req.query;
            if (!ids || typeof ids !== 'string') {
                res.status(400).json({ error: 'IDs parameter is required' });
                return;
            }
            const idArray = ids.split(',').map(id => id.trim());
            const sellers = await this.getSellerUseCase.executeByIds(idArray);
            res.json(sellers);
        }
        catch (error) {
            console.error('Error fetching sellers by IDs:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async getVerifiedSellers(req, res) {
        try {
            const sellers = await this.getSellerUseCase.executeVerified();
            res.json(sellers);
        }
        catch (error) {
            console.error('Error fetching verified sellers:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
exports.ProductController = ProductController;
