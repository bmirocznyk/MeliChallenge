import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';

export function createProductRoutes(productController: ProductController): Router {
  const router = Router();

  // Product routes
  router.get('/products/:id', productController.getProduct.bind(productController));
  router.get('/products/:id/comments', productController.getProductComments.bind(productController));
  router.get('/products/:id/with-payment-methods', productController.getProductWithPaymentMethods.bind(productController));

  // Payment method routes
  router.get('/payment-methods', productController.getPaymentMethods.bind(productController));
  router.get('/payment-methods/by-ids', productController.getPaymentMethodsByIds.bind(productController));

  // Seller routes
  router.get('/sellers/:id', productController.getSeller.bind(productController));

  return router;
} 