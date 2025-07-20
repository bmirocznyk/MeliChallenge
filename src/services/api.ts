import { Product } from '../types/product';
import { PaymentMethod } from '../types/product';

const API_BASE = 'http://localhost:3001/api';

export const api = {
  async getItem(id: number) {
    const response = await fetch(`${API_BASE}/products/${id}`);
    if (!response.ok) {
      throw new Error('Product not found');
    }
    return response.json();
  },

  async getProductComments(productId: string | number) {
    const response = await fetch(`${API_BASE}/products/${productId}/comments`);
    if (!response.ok) {
      throw new Error('Failed to fetch product comments');
    }
    return response.json();
  },

  async getPaymentMethods(): Promise<PaymentMethod[]> {
    const response = await fetch(`${API_BASE}/payment-methods`);
    if (!response.ok) {
      throw new Error('Failed to fetch payment methods');
    }
    return response.json();
  },

  async getPaymentMethodsByIds(ids: string[]): Promise<PaymentMethod[]> {
    const idsParam = ids.join(',');
    const response = await fetch(`${API_BASE}/payment-methods/by-ids?ids=${idsParam}`);
    if (!response.ok) {
      throw new Error('Failed to fetch payment methods by IDs');
    }
    return response.json();
  },

  async getProductWithPaymentMethods(id: string): Promise<Product & { paymentMethods: PaymentMethod[] }> {
    const response = await fetch(`${API_BASE}/products/${id}/with-payment-methods`);
    if (!response.ok) {
      throw new Error('Failed to fetch product with payment methods');
    }
    return response.json();
  }
}; 