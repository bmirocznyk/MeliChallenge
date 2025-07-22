import { Seller } from '../../shared/types/product';
import { SellerRepository } from '../../domain/repositories/SellerRepository';

export class GetSellerUseCase {
  constructor(private sellerRepository: SellerRepository) {}

  async execute(id: string | number): Promise<Seller | null> {
    return this.sellerRepository.findById(id);
  }

  async executeAll(): Promise<Seller[]> {
    return this.sellerRepository.findAll();
  }

  async executeByIds(ids: (string | number)[]): Promise<Seller[]> {
    return this.sellerRepository.findByIds(ids);
  }

  async executeByType(type: string): Promise<Seller[]> {
    return this.sellerRepository.findByType(type);
  }

  async executeVerified(): Promise<Seller[]> {
    return this.sellerRepository.findVerified();
  }
} 