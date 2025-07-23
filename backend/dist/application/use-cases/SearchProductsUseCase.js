"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchProductsUseCase = void 0;
class SearchProductsUseCase {
    productRepository;
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async execute(query) {
        return await this.productRepository.search(query);
    }
    get repository() {
        return this.productRepository;
    }
}
exports.SearchProductsUseCase = SearchProductsUseCase;
