"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSellerUseCase = void 0;
class GetSellerUseCase {
    sellerRepository;
    constructor(sellerRepository) {
        this.sellerRepository = sellerRepository;
    }
    async execute(id) {
        return this.sellerRepository.findById(id);
    }
}
exports.GetSellerUseCase = GetSellerUseCase;
