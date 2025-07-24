import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { JsonPaymentMethodRepository } from './JsonPaymentMethodRepository';
import * as fs from 'fs/promises';
import { PaymentMethod } from '@/shared/types/product';

vi.mock('fs/promises');

describe('JsonPaymentMethodRepository', () => {
  let repository: JsonPaymentMethodRepository;
  const mockMethods: PaymentMethod[] = [
    { id: 1, name: 'Visa', type: 'credit_card', category: 'Tarjetas de crédito', icon: '/payment-icons/visa.png' },
    { id: 2, name: 'Mastercard', type: 'credit_card', category: 'Tarjetas de crédito', icon: '/payment-icons/mastercard.png' }
  ];

  beforeEach(() => {
    repository = new JsonPaymentMethodRepository();
    (fs.readFile as any).mockResolvedValue(JSON.stringify(mockMethods));
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('findAll returns all payment methods', async () => {
    const methods = await repository.findAll();
    expect(methods).toEqual(mockMethods);
  });

  it('findByIds returns methods for given ids', async () => {
    const methods = await repository.findByIds([1]);
    expect(methods).toEqual([mockMethods[0]]);
  });

  it('findByIds returns empty array if no ids match', async () => {
    const methods = await repository.findByIds([999]);
    expect(methods).toEqual([]);
  });

  it('findAll handles JSON parse error gracefully', async () => {
    (fs.readFile as any).mockImplementation(() => { throw new Error('read error'); });
    const methods = await repository.findAll();
    expect(methods).toEqual([]);
  });

  it('findByIds handles JSON parse error gracefully', async () => {
    (fs.readFile as any).mockImplementation(() => { throw new Error('read error'); });
    const methods = await repository.findByIds([1]);
    expect(methods).toEqual([]);
  });
}); 