"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProductCommentsUseCase = void 0;
class GetProductCommentsUseCase {
    commentRepository;
    constructor(commentRepository) {
        this.commentRepository = commentRepository;
    }
    async execute(productId) {
        return await this.commentRepository.findByProductId(productId);
    }
    async getReviewSummary(productId) {
        return await this.commentRepository.getReviewSummary(productId);
    }
}
exports.GetProductCommentsUseCase = GetProductCommentsUseCase;
