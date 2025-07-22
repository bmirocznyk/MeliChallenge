import { Seller } from '../../shared/types/product';

export interface SellerRepository {
  findAll(): Promise<Seller[]>;
  findById(id: string | number): Promise<Seller | null>;
  findByIds(ids: (string | number)[]): Promise<Seller[]>;
  findByType(type: string): Promise<Seller[]>;
  findVerified(): Promise<Seller[]>;
} 