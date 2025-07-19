import { Product } from '@/shared/types/product';
import { ProductRepository } from '@/domain/repositories/ProductRepository';

export class SearchProductsUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(query: string): Promise<Product[]> {
    return await this.productRepository.search(query);
  }
} 