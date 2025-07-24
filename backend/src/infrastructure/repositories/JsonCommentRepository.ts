import fs from 'fs/promises';
import path from 'path';
import { CommentRepository } from '../../domain/repositories/CommentRepository';

export class JsonCommentRepository implements CommentRepository {
  private readonly dataPath: string;

  constructor() {
    this.dataPath = path.join(__dirname, '../database/comments.json');
  }

  private async loadComments(): Promise<{ [key: string]: any[] }> {
    try {
      const data = await fs.readFile(this.dataPath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error loading comments:', error);
      return {};
    }
  }

  async findByProductId(productId: string | number): Promise<any[]> {
    const comments = await this.loadComments();
    return comments[String(productId)] || [];
  }

  async getReviewSummary(productId: string | number): Promise<any> {
    const comments = await this.findByProductId(productId);
    
    if (comments.length === 0) {
      return {
        averageRating: 0,
        totalReviews: 0,
        ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
      };
    }

    const totalRating = comments.reduce((sum, comment) => sum + comment.rating, 0);
    const averageRating = totalRating / comments.length;
    
    const ratingDistribution: { [key: number]: number } = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    comments.forEach(comment => {
      const rating = comment.rating as number;
      if (ratingDistribution[rating] !== undefined) {
        ratingDistribution[rating]++;
      }
    });

    return {
      averageRating: Math.round(averageRating * 10) / 10,
      totalReviews: comments.length,
      ratingDistribution
    };
  }
} 