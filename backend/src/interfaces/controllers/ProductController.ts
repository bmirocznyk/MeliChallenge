import { Request, Response } from 'express';
import { GetProductUseCase } from '../../application/use-cases/GetProductUseCase';
import { GetProductCommentsUseCase } from '../../application/use-cases/GetProductCommentsUseCase';
import { GetPaymentMethodsUseCase } from '../../application/use-cases/GetPaymentMethodsUseCase';
import { GetSellerUseCase } from '../../application/use-cases/GetSellerUseCase';
import { JsonProductRepository } from '../../infrastructure/repositories/JsonProductRepository';
import { JsonCommentRepository } from '../../infrastructure/repositories/JsonCommentRepository';
import { JsonPaymentMethodRepository } from '../../infrastructure/repositories/JsonPaymentMethodRepository';
import { JsonSellerRepository } from '../../infrastructure/repositories/JsonSellerRepository';

export class ProductController {
  private getProductUseCase: GetProductUseCase;
  private getProductCommentsUseCase: GetProductCommentsUseCase;
  private getPaymentMethodsUseCase: GetPaymentMethodsUseCase;
  private getSellerUseCase: GetSellerUseCase;

  constructor() {
    const productRepository = new JsonProductRepository();
    const commentRepository = new JsonCommentRepository();
    const paymentMethodRepository = new JsonPaymentMethodRepository();
    const sellerRepository = new JsonSellerRepository();

    this.getProductUseCase = new GetProductUseCase(productRepository);
    this.getProductCommentsUseCase = new GetProductCommentsUseCase(commentRepository);
    this.getPaymentMethodsUseCase = new GetPaymentMethodsUseCase(paymentMethodRepository);
    this.getSellerUseCase = new GetSellerUseCase(sellerRepository);
  }

  async getProduct(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const product = await this.getProductUseCase.execute(id);

      if (!product) {
        res.status(404).json({ 
          error: 'Product not found',
          message: `Product with id ${id} was not found`
        });
        return;
      }

      res.json(product);
    } catch (error) {
      console.error('Error getting product:', error);
      res.status(500).json({ 
        error: 'Internal server error',
        message: 'An error occurred while retrieving the product'
      });
    }
  }

  async getProductComments(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const comments = await this.getProductCommentsUseCase.execute(id);
      const reviewSummary = await this.getProductCommentsUseCase.getReviewSummary(id);
      
      res.json({
        comments,
        summary: reviewSummary
      });
    } catch (error) {
      console.error('Error getting product comments:', error);
      res.status(500).json({ 
        error: 'Internal server error',
        message: 'An error occurred while retrieving product comments'
      });
    }
  }

  async getPaymentMethods(req: Request, res: Response): Promise<void> {
    try {
      const paymentMethods = await this.getPaymentMethodsUseCase.execute();
      res.json(paymentMethods);
    } catch (error) {
      console.error('Error fetching payment methods:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getPaymentMethodsByIds(req: Request, res: Response): Promise<void> {
    try {
      const { ids } = req.query;
      if (!ids || typeof ids !== 'string') {
        res.status(400).json({ error: 'Payment method IDs are required' });
        return;
      }
      
      const idArray = ids.split(',').map(id => parseInt(id.trim()));
      const paymentMethods = await this.getPaymentMethodsUseCase.executeByIds(idArray);
      res.json(paymentMethods);
    } catch (error) {
      console.error('Error fetching payment methods by IDs:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getProductWithPaymentMethods(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const product = await this.getProductUseCase.execute(id);
      
      if (!product) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }

      // Fetch payment methods for this product
      const paymentMethods = await this.getPaymentMethodsUseCase.executeByIds(product.paymentMethodIds || []);
      
      res.json({
        ...product,
        paymentMethods
      });
    } catch (error) {
      console.error('Error fetching product with payment methods:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getSeller(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const seller = await this.getSellerUseCase.execute(id);
      
      if (!seller) {
        res.status(404).json({ error: 'Seller not found' });
        return;
      }

      res.json(seller);
    } catch (error) {
      console.error('Error fetching seller:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
} 