import { PaymentMethod } from '../../shared/types/product';
import { PaymentMethodRepository } from '../../domain/repositories/PaymentMethodRepository';

export class GetPaymentMethodsUseCase {
  constructor(private paymentMethodRepository: PaymentMethodRepository) {}

  async execute(): Promise<PaymentMethod[]> {
    return this.paymentMethodRepository.findEnabled();
  }

  async executeByIds(ids: string[]): Promise<PaymentMethod[]> {
    const paymentMethods = await this.paymentMethodRepository.findByIds(ids);
    return paymentMethods.filter(pm => pm.enabled).sort((a, b) => a.priority - b.priority);
  }

  async executeByCategory(category: string): Promise<PaymentMethod[]> {
    return this.paymentMethodRepository.findByCategory(category);
  }
} 