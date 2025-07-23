import { Product } from '@/shared/types/product';

export interface ProductRepository {
  findAll(): Promise<Product[]>;
  findById(id: string | number): Promise<Product | null>;
  findByCategory(categoryId: string | number): Promise<Product[]>;
  search(query: string): Promise<Product[]>;
  getProductComments(productId: string | number): Promise<any[]>;
  saveProducts(): Promise<void>;
} 