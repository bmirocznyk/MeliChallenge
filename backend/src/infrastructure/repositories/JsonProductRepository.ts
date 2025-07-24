import { Product } from '@/shared/types/product';
import { ProductRepository } from '@/domain/repositories/ProductRepository';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

export class JsonProductRepository implements ProductRepository {
  private readonly dataPath: string;
  private lastProductUpdated: Product | null = null;

  constructor() {
    this.dataPath = join(__dirname, '../database/products.json');
  }

  // Siempre lee el archivo JSON desde disco para reflejar cualquier cambio manual o externo.
  private loadProducts(): Product[] {
    try {
      const data = readFileSync(this.dataPath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error loading products:', error);
      return [];
    }
  }

  async findById(id: string | number): Promise<Product | null> {
    const products = this.loadProducts();
    const product = products.find(p => p.id == id) || null;
    // Guardamos referencia para persistir cambios en saveProducts
    this.lastProductUpdated = product ? { ...product } : null;
    return product;
  }

  async saveProducts(): Promise<void> {
    if (!this.lastProductUpdated) return;
    const products = this.loadProducts();
    const idx = products.findIndex(p => p.id == this.lastProductUpdated!.id);
    if (idx !== -1) {
      products[idx] = this.lastProductUpdated!;
      try {
        writeFileSync(this.dataPath, JSON.stringify(products, null, 2), 'utf-8');
      } catch (error) {
        console.error('Error saving products:', error);
        throw new Error('Failed to save products');
      }
    }
  }
} 