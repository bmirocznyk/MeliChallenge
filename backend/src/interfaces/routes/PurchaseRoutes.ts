import { Router } from 'express';
import { PurchaseController } from '../controllers/PurchaseController';

export function createPurchaseRoutes(purchaseController: PurchaseController): Router {
  const router = Router();
  router.post('/purchase', purchaseController.purchase.bind(purchaseController));
  return router;
} 