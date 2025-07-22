import { Product } from '@/shared/types/product';
import { ProductRepository } from '@/domain/repositories/ProductRepository';
import { readFileSync } from 'fs';
import fs from 'fs/promises';
import { join } from 'path';

export class JsonProductRepository implements ProductRepository {
  private products: Product[] = [];

  constructor() {
    this.loadProducts();
  }

  private loadProducts(): void {
    try {
      const dataPath = join(__dirname, '../database/products.json');
      const data = readFileSync(dataPath, 'utf-8');
      this.products = JSON.parse(data);
    } catch (error) {
      console.error('Error loading products:', error);
      this.products = [];
    }
  }

  async findAll(): Promise<Product[]> {
    return this.products;
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
    const lowerQuery = query.toLowerCase();
    return this.products.filter(product => 
      product.title.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.brand?.toLowerCase().includes(lowerQuery) ||
      product.model?.toLowerCase().includes(lowerQuery)
    );
  }

  async getProductComments(productId: string | number): Promise<any[]> {
    const data = await fs.readFile('src/infrastructure/database/comments.json', 'utf-8');
    const comments = JSON.parse(data);
    return comments[String(productId)] || [];
  }
} 