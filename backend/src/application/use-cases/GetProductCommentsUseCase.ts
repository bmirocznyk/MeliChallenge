import { CommentRepository } from '../../domain/repositories/CommentRepository';

export class GetProductCommentsUseCase {
  constructor(private commentRepository: CommentRepository) {}

  async execute(productId: string | number): Promise<any[]> {
    return await this.commentRepository.findByProductId(productId);
  }

  async getReviewSummary(productId: string | number): Promise<any> {
    return await this.commentRepository.getReviewSummary(productId);
  }
} 