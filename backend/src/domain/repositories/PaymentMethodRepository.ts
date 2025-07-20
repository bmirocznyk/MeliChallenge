import { PaymentMethod } from '../../shared/types/product';

export interface PaymentMethodRepository {
  findAll(): Promise<PaymentMethod[]>;
  findById(id: string): Promise<PaymentMethod | null>;
  findByIds(ids: string[]): Promise<PaymentMethod[]>;
  findByCategory(category: string): Promise<PaymentMethod[]>;
  findEnabled(): Promise<PaymentMethod[]>;
} 