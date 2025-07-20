export interface Comment {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CommentRepository {
  findByProductId(productId: string): Promise<Comment[]>;
  calculateAverageRating(productId: string): Promise<number>;
  getReviewSummary(productId: string): Promise<{
    averageRating: number;
    totalReviews: number;
    ratingDistribution: { [key: number]: number };
  }>;
} 