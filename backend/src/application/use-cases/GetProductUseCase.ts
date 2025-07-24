import { Product } from '@/shared/types/product';
import { ProductRepository } from '@/domain/repositories/ProductRepository';

export class GetProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(id: string | number): Promise<Product | null> {
    return await this.productRepository.findById(id);
  }
} 