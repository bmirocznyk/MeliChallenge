import { Seller } from '../../shared/types/product';

export interface SellerRepository {
  findById(id: string | number): Promise<Seller | null>;
} 