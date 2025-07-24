import { describe, it, expect, vi, beforeEach, type Mocked } from 'vitest';
import { GetProductCommentsUseCase } from './GetProductCommentsUseCase';
import { CommentRepository } from '../../domain/repositories/CommentRepository';

describe('GetProductCommentsUseCase', () => {
  let commentRepository: Mocked<CommentRepository>;
  let useCase: GetProductCommentsUseCase;

  const mockComments = [
    { id: 1, productId: '1', text: 'Great product!', rating: 5 },
    { id: 2, productId: '1', text: 'Good value', rating: 4 }
  ];

  const mockReviewSummary = {
    rating: 4.5,
    totalReviews: 2,
    ratingDistribution: {
      5: 1,
      4: 1,
      3: 0,
      2: 0,
      1: 0
    }
  };

  beforeEach(() => {
    commentRepository = {
      findByProductId: vi.fn(),
      getReviewSummary: vi.fn()
    };
    useCase = new GetProductCommentsUseCase(commentRepository);
  });

  it('returns comments for a product', async () => {
    commentRepository.findByProductId.mockResolvedValue(mockComments);
    const result = await useCase.execute('1');
    expect(result).toEqual(mockComments);
    expect(commentRepository.findByProductId).toHaveBeenCalledWith('1');
  });

  it('returns empty array when no comments exist', async () => {
    commentRepository.findByProductId.mockResolvedValue([]);
    const result = await useCase.execute('999');
    expect(result).toEqual([]);
  });

  it('throws if repository throws during findByProductId', async () => {
    commentRepository.findByProductId.mockRejectedValue(new Error('DB error'));
    await expect(useCase.execute('1')).rejects.toThrow('DB error');
  });

  it('returns review summary for a product', async () => {
    commentRepository.getReviewSummary.mockResolvedValue(mockReviewSummary);
    const result = await useCase.getReviewSummary('1');
    expect(result).toEqual(mockReviewSummary);
    expect(commentRepository.getReviewSummary).toHaveBeenCalledWith('1');
  });

  it('returns null when no reviews exist', async () => {
    commentRepository.getReviewSummary.mockResolvedValue(null);
    const result = await useCase.getReviewSummary('999');
    expect(result).toBeNull();
  });

  it('throws if repository throws during getReviewSummary', async () => {
    commentRepository.getReviewSummary.mockRejectedValue(new Error('DB error'));
    await expect(useCase.getReviewSummary('1')).rejects.toThrow('DB error');
  });
}); 