import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { createPurchaseRoutes } from './interfaces/routes/PurchaseRoutes';
import { PurchaseController } from './interfaces/controllers/PurchaseController';
import { Request, Response, NextFunction } from 'express';

const app = express();
const PORT = process.env.PURCHASE_PORT || 3002;

app.use(helmet());
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json());

const purchaseController = new PurchaseController();
const purchaseRoutes = createPurchaseRoutes(purchaseController);
app.use('/api', purchaseRoutes);

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Purchase Service is running',
    timestamp: new Date().toISOString()
  });
});

app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`
  });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'An unexpected error occurred'
  });
});

app.listen(PORT, () => {
  console.log(`🛒 Purchase Service running on http://localhost:${PORT}`);
  console.log(`📦 Purchase endpoint: http://localhost:${PORT}/api/purchase`);
}); 