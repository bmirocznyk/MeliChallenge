import { readFileSync } from 'fs';
import { join } from 'path';
import { Seller } from '../../shared/types/product';
import { SellerRepository } from '../../domain/repositories/SellerRepository';

export class JsonSellerRepository implements SellerRepository {
  private sellers: Seller[] = [];

  constructor() {
    this.loadSellers();
  }

  private loadSellers(): void {
    try {
      const dataPath = join(__dirname, '../database/sellers.json');
      const data = readFileSync(dataPath, 'utf-8');
      this.sellers = JSON.parse(data);
    } catch (error) {
      console.error('Error loading sellers:', error);
      this.sellers = [];
    }
  }

  async findById(id: string | number): Promise<Seller | null> {
    const sellerId = typeof id === 'string' ? parseInt(id) : id;
    return this.sellers.find(seller => seller.id === sellerId) || null;
  }
} 