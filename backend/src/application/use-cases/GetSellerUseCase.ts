import { Seller } from '../../shared/types/product';
import { SellerRepository } from '../../domain/repositories/SellerRepository';

export class GetSellerUseCase {
  constructor(private sellerRepository: SellerRepository) {}

  async execute(id: string | number): Promise<Seller | null> {
    return this.sellerRepository.findById(id);
  }
} 