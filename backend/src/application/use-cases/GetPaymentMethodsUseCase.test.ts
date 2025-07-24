import { describe, it, expect, vi, beforeEach, type Mocked } from 'vitest';
import { GetPaymentMethodsUseCase } from './GetPaymentMethodsUseCase';
import { PaymentMethod } from '../../shared/types/product';
import { PaymentMethodRepository } from '../../domain/repositories/PaymentMethodRepository';

describe('GetPaymentMethodsUseCase', () => {
  let paymentMethodRepository: Mocked<PaymentMethodRepository>;
  let useCase: GetPaymentMethodsUseCase;

  const mockPaymentMethods: PaymentMethod[] = [
    {
      id: 1,
      name: 'Credit Card',
      type: 'credit_card',
      category: 'card',
      icon: 'credit-card.png'
    },
    {
      id: 2,
      name: 'Debit Card',
      type: 'debit_card',
      category: 'card',
      icon: 'debit-card.png'
    }
  ];

  beforeEach(() => {
    paymentMethodRepository = {
      findAll: vi.fn(),
      findByIds: vi.fn()
    };
    useCase = new GetPaymentMethodsUseCase(paymentMethodRepository);
  });

  it('returns all payment methods', async () => {
    paymentMethodRepository.findAll.mockResolvedValue(mockPaymentMethods);
    const result = await useCase.execute();
    expect(result).toEqual(mockPaymentMethods);
    expect(paymentMethodRepository.findAll).toHaveBeenCalled();
  });

  it('returns empty array when no payment methods exist', async () => {
    paymentMethodRepository.findAll.mockResolvedValue([]);
    const result = await useCase.execute();
    expect(result).toEqual([]);
  });

  it('throws if repository throws', async () => {
    paymentMethodRepository.findAll.mockRejectedValue(new Error('DB error'));
    await expect(useCase.execute()).rejects.toThrow('DB error');
  });

  it('returns payment methods for given ids', async () => {
    const ids = [1];
    const expectedMethods = [mockPaymentMethods[0]];
    paymentMethodRepository.findByIds.mockResolvedValue(expectedMethods);
    const result = await useCase.executeByIds(ids);
    expect(result).toEqual(expectedMethods);
    expect(paymentMethodRepository.findByIds).toHaveBeenCalledWith(ids);
  });

  it('returns empty array when no payment methods found for ids', async () => {
    paymentMethodRepository.findByIds.mockResolvedValue([]);
    const result = await useCase.executeByIds([999]);
    expect(result).toEqual([]);
  });

  it('throws if repository throws during findByIds', async () => {
    paymentMethodRepository.findByIds.mockRejectedValue(new Error('DB error'));
    await expect(useCase.executeByIds([1])).rejects.toThrow('DB error');
  });
}); 