import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

// Routes
import { createProductRoutes } from './interfaces/routes/ProductRoutes.js';
import { ProductController } from './interfaces/controllers/ProductController.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json());

// Routes
const productController = new ProductController();
const apiRoutes = createProductRoutes(productController);
app.use('/api', apiRoutes);

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
      productById: '/api/products/:id',
      productComments: '/api/products/:id/comments',
      productWithPaymentMethods: '/api/products/:id/with-payment-methods',
      paymentMethods: '/api/payment-methods',
      paymentMethodsByIds: '/api/payment-methods/by-ids',
      sellerById: '/api/sellers/:id'
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