export class GetProductCommentsUseCase {
    commentRepository;
    constructor(commentRepository) {
        this.commentRepository = commentRepository;
    }
    async execute(productId) {
        return this.commentRepository.findByProductId(productId);
    }
    async getReviewSummary(productId) {
        return this.commentRepository.getReviewSummary(productId);
    }
}
