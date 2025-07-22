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
    async executeAll() {
        return this.sellerRepository.findAll();
    }
    async executeByIds(ids) {
        return this.sellerRepository.findByIds(ids);
    }
    async executeByType(type) {
        return this.sellerRepository.findByType(type);
    }
    async executeVerified() {
        return this.sellerRepository.findVerified();
    }
}
exports.GetSellerUseCase = GetSellerUseCase;
