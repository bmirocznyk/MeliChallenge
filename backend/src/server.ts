import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

// Infrastructure
import { JsonProductRepository } from './infrastructure/repositories/JsonProductRepository';

// Application
import { GetProductUseCase } from './application/use-cases/GetProductUseCase';
import { GetAllProductsUseCase } from './application/use-cases/GetAllProductsUseCase';
import { SearchProductsUseCase } from './application/use-cases/SearchProductsUseCase';

// Interfaces
import { ProductController } from './interfaces/controllers/ProductController';
import { createProductRoutes } from './interfaces/routes/ProductRoutes';

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json());

// Dependency Injection Setup
const productRepository = new JsonProductRepository();
const getProductUseCase = new GetProductUseCase(productRepository);
const getAllProductsUseCase = new GetAllProductsUseCase(productRepository);
const searchProductsUseCase = new SearchProductsUseCase(productRepository);

const productController = new ProductController(
  getProductUseCase,
  getAllProductsUseCase,
  searchProductsUseCase
);

// Routes
app.use('/api/products', createProductRoutes(productController));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'MercadoLibre Backend API is running',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'MercadoLibre Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      products: '/api/products',
      productById: '/api/products/:id',
      search: '/api/products/search?q=query'
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`
  });
});

// Error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: 'An unexpected error occurred'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 MercadoLibre Backend API running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📦 Products API: http://localhost:${PORT}/api/products`);
}); 