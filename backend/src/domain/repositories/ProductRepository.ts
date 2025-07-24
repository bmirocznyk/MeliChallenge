import { Product } from '@/shared/types/product';

export interface ProductRepository {
  findById(id: string | number): Promise<Product | null>;
  saveProducts(): Promise<void>;
} 