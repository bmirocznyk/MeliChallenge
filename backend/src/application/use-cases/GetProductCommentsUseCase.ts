import { CommentRepository, Comment } from '@/domain/repositories/CommentRepository';

export class GetProductCommentsUseCase {
  constructor(private commentRepository: CommentRepository) {}

  async execute(productId: string): Promise<Comment[]> {
    return this.commentRepository.findByProductId(productId);
  }

  async getReviewSummary(productId: string) {
    return this.commentRepository.getReviewSummary(productId);
  }
} 