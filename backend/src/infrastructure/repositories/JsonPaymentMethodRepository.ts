import fs from 'fs/promises';
import path from 'path';
import { PaymentMethod } from '../../shared/types/product';
import { PaymentMethodRepository } from '../../domain/repositories/PaymentMethodRepository';

export class JsonPaymentMethodRepository implements PaymentMethodRepository {
  private readonly dataPath: string;

  constructor() {
    this.dataPath = path.join(__dirname, '../database/payment-methods.json');
  }

  private async loadPaymentMethods(): Promise<PaymentMethod[]> {
    try {
      const data = await fs.readFile(this.dataPath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error loading payment methods:', error);
      return [];
    }
  }

  async findAll(): Promise<PaymentMethod[]> {
    return this.loadPaymentMethods();
  }

  async findByIds(ids: number[]): Promise<PaymentMethod[]> {
    const paymentMethods = await this.loadPaymentMethods();
    return paymentMethods.filter(pm => ids.includes(pm.id));
  }
} 