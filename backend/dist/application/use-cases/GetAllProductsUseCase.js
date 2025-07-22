"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllProductsUseCase = void 0;
class GetAllProductsUseCase {
    productRepository;
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async execute() {
        return await this.productRepository.findAll();
    }
}
exports.GetAllProductsUseCase = GetAllProductsUseCase;
