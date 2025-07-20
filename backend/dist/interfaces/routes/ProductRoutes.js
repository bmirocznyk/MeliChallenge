import { Router } from 'express';
export function createProductRoutes(productController) {
    const router = Router();
    // GET /api/products - Get all products
    router.get('/', (req, res) => productController.getAllProducts(req, res));
    // GET /api/products/search?q=query - Search products
    router.get('/search', (req, res) => productController.searchProducts(req, res));
    // GET /api/products/:id - Get product by ID
    router.get('/:id', (req, res) => productController.getProduct(req, res));
    // GET /api/products/:id/comments - Get product comments
    router.get('/:id/comments', (req, res) => productController.getProductComments(req, res));
    return router;
}
