"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseProductUseCase = void 0;
class PurchaseProductUseCase {
    productRepository;
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async execute(productId, quantity) {
        const product = await this.productRepository.findById(productId);
        if (!product) {
            return { success: false, message: 'Product not found' };
        }
        if (typeof product.availableQuantity !== 'number' || product.availableQuantity < quantity) {
            return { success: false, message: 'Not enough stock' };
        }
        product.availableQuantity -= quantity;
        // Persist the change
        if (typeof this.productRepository.saveProducts === 'function') {
            await this.productRepository.saveProducts();
        }
        return { success: true, product };
    }
}
exports.PurchaseProductUseCase = PurchaseProductUseCase;
