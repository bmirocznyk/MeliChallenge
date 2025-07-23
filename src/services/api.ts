import { Product } from '../types/product';
import { PaymentMethod, Seller } from '../types/product';

const API_BASE = 'http://localhost:3001/api';

const PURCHASE_API_BASE = 'http://localhost:3002/api';

export const api = {
  async getItem(id: number) {
    const response = await fetch(`${API_BASE}/products/${id}`);
    if (!response.ok) {
      throw new Error('Product not found');
    }
    return response.json();
  },

  async getProductComments(productId: string): Promise<{ comments: any[], summary: any }> {
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

  async getPaymentMethodsByIds(ids: number[]): Promise<PaymentMethod[]> {
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
  },

  // Seller API methods
  async getSeller(id: string | number): Promise<Seller> {
    const response = await fetch(`${API_BASE}/sellers/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch seller');
    }
    return response.json();
  },

  async getAllSellers(): Promise<Seller[]> {
    const response = await fetch(`${API_BASE}/sellers`);
    if (!response.ok) {
      throw new Error('Failed to fetch sellers');
    }
    return response.json();
  },

  async getSellersByIds(ids: (string | number)[]): Promise<Seller[]> {
    const idsParam = ids.join(',');
    const response = await fetch(`${API_BASE}/sellers/by-ids?ids=${idsParam}`);
    if (!response.ok) {
      throw new Error('Failed to fetch sellers by IDs');
    }
    return response.json();
  },

  async getVerifiedSellers(): Promise<Seller[]> {
    const response = await fetch(`${API_BASE}/sellers/verified`);
    if (!response.ok) {
      throw new Error('Failed to fetch verified sellers');
    }
    return response.json();
  },

  async getProductWithSellerAndPaymentMethods(id: string): Promise<Product & { seller: Seller; paymentMethods: PaymentMethod[] }> {
    const [product, paymentMethodsData] = await Promise.all([
      this.getItem(parseInt(id)),
      this.getProductWithPaymentMethods(id)
    ]);
    
    // Check if sellerId exists before fetching seller
    if (!product.sellerId) {
      throw new Error(`Product ${id} does not have a sellerId`);
    }
    
    const seller = await this.getSeller(product.sellerId);
    
    return {
      ...product,
      seller,
      paymentMethods: paymentMethodsData.paymentMethods
    };
  },

  async purchaseProduct(productId: string | number, quantity: number): Promise<any> {
    const response = await fetch(`${PURCHASE_API_BASE}/purchase`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId, quantity }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Purchase failed');
    }
    return response.json();
  }
}; 