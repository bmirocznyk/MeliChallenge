"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductRoutes = createProductRoutes;
const express_1 = require("express");
function createProductRoutes(productController) {
    const router = (0, express_1.Router)();
    // Product routes
    router.get('/products', productController.getAllProducts.bind(productController));
    router.get('/products/search', productController.searchProducts.bind(productController));
    router.get('/products/:id', productController.getProduct.bind(productController));
    router.get('/products/:id/comments', productController.getProductComments.bind(productController));
    router.get('/products/:id/with-payment-methods', productController.getProductWithPaymentMethods.bind(productController));
    // Payment method routes
    router.get('/payment-methods', productController.getPaymentMethods.bind(productController));
    router.get('/payment-methods/by-ids', productController.getPaymentMethodsByIds.bind(productController));
    // Seller routes
    router.get('/sellers', productController.getAllSellers.bind(productController));
    router.get('/sellers/verified', productController.getVerifiedSellers.bind(productController));
    router.get('/sellers/by-ids', productController.getSellersByIds.bind(productController));
    router.get('/sellers/:id', productController.getSeller.bind(productController));
    return router;
}
