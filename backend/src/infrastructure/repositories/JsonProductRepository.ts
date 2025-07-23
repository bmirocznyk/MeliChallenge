import { Product } from '@/shared/types/product';
import { ProductRepository } from '@/domain/repositories/ProductRepository';
import { readFileSync } from 'fs';
import fs from 'fs/promises';
import { join } from 'path';

export class JsonProductRepository implements ProductRepository {
  private products: Product[] = [];
  private readonly dataPath: string;

  constructor() {
    this.dataPath = join(__dirname, '../database/products.json');
    this.loadProducts();
  }

  private loadProducts(): void {
    try {
      const data = readFileSync(this.dataPath, 'utf-8');
      this.products = JSON.parse(data);
    } catch (error) {
      console.error('Error loading products:', error);
      this.products = [];
    }
  }

  async findAll(): Promise<Product[]> {
    return [...this.products];
  }

  async findById(id: string | number): Promise<Product | null> {
    const product = this.products.find(p => p.id == id);
    return product || null;
  }

  async findByCategory(categoryId: string | number): Promise<Product[]> {
    return this.products.filter(product => 
      product.categories.some(category => category.id == categoryId)
    );
  }

  async search(query: string): Promise<Product[]> {
    if (!query || query.trim() === '') {
      return [];
    }

    const searchTerm = query.toLowerCase().trim();
    
    return this.products.filter(product => {
      const titleMatch = product.title.toLowerCase().includes(searchTerm);
      const descriptionMatch = product.description.toLowerCase().includes(searchTerm);
      
      return titleMatch || descriptionMatch;
    });
  }

  async getProductComments(productId: string | number): Promise<any[]> {
    try {
      const commentsPath = join(__dirname, '../database/comments.json');
      const data = await fs.readFile(commentsPath, 'utf-8');
      const comments = JSON.parse(data);
      return comments[String(productId)] || [];
    } catch (error) {
      console.error('Error loading comments:', error);
      throw error;
    }
  }

  async saveProducts(): Promise<void> {
    try {
      const data = JSON.stringify(this.products, null, 2);
      await fs.writeFile(this.dataPath, data, 'utf-8');
    } catch (error) {
      console.error('Error saving products:', error);
      throw error;
    }
  }
} 