import { PaymentMethod } from '../../shared/types/product';

export interface PaymentMethodRepository {
  findAll(): Promise<PaymentMethod[]>;
  findByIds(ids: number[]): Promise<PaymentMethod[]>;
} 