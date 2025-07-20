export class SearchProductsUseCase {
    productRepository;
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async execute(query) {
        return await this.productRepository.search(query);
    }
}
