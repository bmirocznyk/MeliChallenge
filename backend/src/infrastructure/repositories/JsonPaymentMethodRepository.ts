import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { PaymentMethod } from '../../shared/types/product';
import { PaymentMethodRepository } from '../../domain/repositories/PaymentMethodRepository';

export class JsonPaymentMethodRepository implements PaymentMethodRepository {
  private readonly dataPath: string;

  constructor() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
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

  async findById(id: string): Promise<PaymentMethod | null> {
    const paymentMethods = await this.loadPaymentMethods();
    return paymentMethods.find(pm => pm.id === id) || null;
  }

  async findByIds(ids: string[]): Promise<PaymentMethod[]> {
    const paymentMethods = await this.loadPaymentMethods();
    return paymentMethods.filter(pm => ids.includes(pm.id));
  }

  async findByCategory(category: string): Promise<PaymentMethod[]> {
    const paymentMethods = await this.loadPaymentMethods();
    return paymentMethods.filter(pm => pm.category === category);
  }

  async findEnabled(): Promise<PaymentMethod[]> {
    const paymentMethods = await this.loadPaymentMethods();
    return paymentMethods.filter(pm => pm.enabled);
  }
} 