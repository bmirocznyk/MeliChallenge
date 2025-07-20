import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';

const router = Router();
const productController = new ProductController();

// Existing routes
router.get('/products', (req, res) => productController.getAllProducts(req, res));
router.get('/products/search', (req, res) => productController.searchProducts(req, res));
router.get('/products/:id', (req, res) => productController.getProduct(req, res));
router.get('/products/:id/comments', (req, res) => productController.getProductComments(req, res));

// New payment methods routes
router.get('/payment-methods', (req, res) => productController.getPaymentMethods(req, res));
router.get('/payment-methods/by-ids', (req, res) => productController.getPaymentMethodsByIds(req, res));

// Enhanced product route with payment methods
router.get('/products/:id/with-payment-methods', (req, res) => productController.getProductWithPaymentMethods(req, res));

export default router; 