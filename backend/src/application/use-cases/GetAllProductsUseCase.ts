import { Product } from '@/shared/types/product';
import { ProductRepository } from '@/domain/repositories/ProductRepository';

export class GetAllProductsUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(): Promise<Product[]> {
    return await this.productRepository.findAll();
  }
} 