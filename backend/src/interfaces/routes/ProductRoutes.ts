import { Router, Request, Response } from 'express';
import { ProductController } from '../controllers/ProductController';

export function createProductRoutes(productController: ProductController): Router {
  const router = Router();

  // GET /api/products - Get all products
  router.get('/', (req: Request, res: Response) => productController.getAllProducts(req, res));

  // GET /api/products/search?q=query - Search products
  router.get('/search', (req: Request, res: Response) => productController.searchProducts(req, res));

  // GET /api/products/:id - Get product by ID
  router.get('/:id', (req: Request, res: Response) => productController.getProduct(req, res));

  // GET /api/products/:id/comments - Get product comments
  router.get('/:id/comments', (req: Request, res: Response) => productController.getProductComments(req, res));

  return router;
} 