import { Request, Response } from 'express';
import { GetAllProductsUseCase } from '../../application/use-cases/GetAllProductsUseCase';
import { GetProductUseCase } from '../../application/use-cases/GetProductUseCase';
import { SearchProductsUseCase } from '../../application/use-cases/SearchProductsUseCase';
import { GetProductCommentsUseCase } from '../../application/use-cases/GetProductCommentsUseCase';
import { GetPaymentMethodsUseCase } from '../../application/use-cases/GetPaymentMethodsUseCase';
import { JsonProductRepository } from '../../infrastructure/repositories/JsonProductRepository';
import { JsonCommentRepository } from '../../infrastructure/repositories/JsonCommentRepository';
import { JsonPaymentMethodRepository } from '../../infrastructure/repositories/JsonPaymentMethodRepository';

export class ProductController {
  private getAllProductsUseCase: GetAllProductsUseCase;
  private getProductUseCase: GetProductUseCase;
  private searchProductsUseCase: SearchProductsUseCase;
  private getProductCommentsUseCase: GetProductCommentsUseCase;
  private getPaymentMethodsUseCase: GetPaymentMethodsUseCase;

  constructor() {
    const productRepository = new JsonProductRepository();
    const commentRepository = new JsonCommentRepository();
    const paymentMethodRepository = new JsonPaymentMethodRepository();
    
    this.getAllProductsUseCase = new GetAllProductsUseCase(productRepository);
    this.getProductUseCase = new GetProductUseCase(productRepository);
    this.searchProductsUseCase = new SearchProductsUseCase(productRepository);
    this.getProductCommentsUseCase = new GetProductCommentsUseCase(commentRepository);
    this.getPaymentMethodsUseCase = new GetPaymentMethodsUseCase(paymentMethodRepository);
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

  async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const products = await this.getAllProductsUseCase.execute();
      res.json(products);
    } catch (error) {
      console.error('Error getting all products:', error);
      res.status(500).json({ 
        error: 'Internal server error',
        message: 'An error occurred while retrieving products'
      });
    }
  }

  async searchProducts(req: Request, res: Response): Promise<void> {
    try {
      const { q } = req.query;
      
      if (!q || typeof q !== 'string') {
        res.status(400).json({ 
          error: 'Bad request',
          message: 'Search query parameter "q" is required'
        });
        return;
      }

      const products = await this.searchProductsUseCase.execute(q);
      res.json(products);
    } catch (error) {
      console.error('Error searching products:', error);
      res.status(500).json({ 
        error: 'Internal server error',
        message: 'An error occurred while searching products'
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
      
      const idArray = ids.split(',');
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
} 