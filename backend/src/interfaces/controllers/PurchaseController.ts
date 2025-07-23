import { Request, Response } from 'express';
import { PurchaseProductUseCase } from '../../application/use-cases/PurchaseProductUseCase';
import { JsonProductRepository } from '../../infrastructure/repositories/JsonProductRepository';

export class PurchaseController {
  private purchaseProductUseCase: PurchaseProductUseCase;

  constructor() {
    const productRepository = new JsonProductRepository();
    this.purchaseProductUseCase = new PurchaseProductUseCase(productRepository);
  }

  async purchase(req: Request, res: Response): Promise<void> {
    try {
      const { productId, quantity } = req.body;
      if (!productId || !quantity || quantity <= 0) {
        res.status(400).json({ error: 'Invalid productId or quantity' });
        return;
      }
      const result = await this.purchaseProductUseCase.execute(productId, quantity);
      if (!result.success) {
        res.status(400).json({ error: result.message });
        return;
      }
      res.json(result.product);
    } catch (error) {
      console.error('Error purchasing product:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
} 