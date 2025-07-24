import { ProductRepository } from '../../domain/repositories/ProductRepository';

export class PurchaseProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(productId: string | number, quantity: number): Promise<{ success: boolean; product?: any; message?: string }> {
    const product = await this.productRepository.findById(productId);
    if (!product) {
      return { success: false, message: 'Product not found' };
    }
    if (typeof product.availableQuantity !== 'number' || product.availableQuantity < quantity) {
      return { success: false, message: 'Not enough stock' };
    }
    product.availableQuantity -= quantity;
    // Persist the change
    await this.productRepository.saveProducts();
    return { success: true, product };
  }
} 