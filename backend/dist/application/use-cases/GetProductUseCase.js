"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProductUseCase = void 0;
class GetProductUseCase {
    productRepository;
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async execute(id) {
        return await this.productRepository.findById(id);
    }
    get repository() {
        return this.productRepository;
    }
}
exports.GetProductUseCase = GetProductUseCase;
