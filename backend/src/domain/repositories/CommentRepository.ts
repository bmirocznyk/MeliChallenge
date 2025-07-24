export interface CommentRepository {
  findByProductId(productId: string | number): Promise<any[]>;
  getReviewSummary(productId: string | number): Promise<any>;
} 