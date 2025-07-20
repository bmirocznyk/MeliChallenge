import { Request, Response } from 'express';
import { GetProductUseCase } from '@/application/use-cases/GetProductUseCase';
import { GetAllProductsUseCase } from '@/application/use-cases/GetAllProductsUseCase';
import { SearchProductsUseCase } from '@/application/use-cases/SearchProductsUseCase';
import { GetProductCommentsUseCase } from '@/application/use-cases/GetProductCommentsUseCase';

export class ProductController {
  constructor(
    private getProductUseCase: GetProductUseCase,
    private getAllProductsUseCase: GetAllProductsUseCase,
    private searchProductsUseCase: SearchProductsUseCase,
    private getProductCommentsUseCase: GetProductCommentsUseCase
  ) {}

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
} 