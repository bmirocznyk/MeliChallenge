export class GetProductUseCase {
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
