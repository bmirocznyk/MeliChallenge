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

  async findAll(): Promise<Seller[]> {
    return this.sellers;
  }

  async findById(id: string | number): Promise<Seller | null> {
    const sellerId = typeof id === 'string' ? parseInt(id) : id;
    return this.sellers.find(seller => seller.id === sellerId) || null;
  }

  async findByIds(ids: (string | number)[]): Promise<Seller[]> {
    return this.sellers.filter(seller => 
      ids.some(id => {
        const numericId = typeof id === 'string' ? parseInt(id) : id;
        const sellerIdNum = typeof seller.id === 'string' ? parseInt(seller.id) : seller.id;
        return numericId === sellerIdNum;
      })
    );
  }

  async findByType(type: string): Promise<Seller[]> {
    return this.sellers.filter(seller => seller.type === type);
  }

  async findVerified(): Promise<Seller[]> {
    return this.sellers.filter(seller => seller.verified === true);
  }
} 