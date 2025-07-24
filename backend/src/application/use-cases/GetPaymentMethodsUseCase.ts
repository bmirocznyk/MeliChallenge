import { PaymentMethod } from '../../shared/types/product';
import { PaymentMethodRepository } from '../../domain/repositories/PaymentMethodRepository';

export class GetPaymentMethodsUseCase {
  constructor(private paymentMethodRepository: PaymentMethodRepository) {}

  async execute(): Promise<PaymentMethod[]> {
    return this.paymentMethodRepository.findAll();
  }

  async executeByIds(ids: number[]): Promise<PaymentMethod[]> {
    return this.paymentMethodRepository.findByIds(ids);
  }
} 