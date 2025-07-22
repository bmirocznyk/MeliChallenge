import { PaymentMethod } from '../../shared/types/product';

export interface PaymentMethodRepository {
  findAll(): Promise<PaymentMethod[]>;
  findById(id: number): Promise<PaymentMethod | null>;
  findByIds(ids: number[]): Promise<PaymentMethod[]>;
  findByCategory(category: string): Promise<PaymentMethod[]>;
} 