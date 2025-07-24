import { describe, it, expect, beforeEach, vi } from 'vitest';
import { GetProductCommentsUseCase } from '../../application/use-cases/GetProductCommentsUseCase';
import { CommentRepository } from '../../domain/repositories/CommentRepository';

// Mock repository
const mockCommentRepository = {
  findByProductId: vi.fn() as any,
  getReviewSummary: vi.fn() as any
};

const mockComments = [
  { id: 1, user: 'maria_gonzalez', rating: 5, comment: 'Excelente producto', date: '2024-01-20' },
  { id: 2, user: 'juan_perez', rating: 4, comment: 'Muy buen teléfono', date: '2024-01-18' }
];

const mockSummary = {
  averageRating: 4.5,
  totalReviews: 2,
  ratingDistribution: { 5: 1, 4: 1, 3: 0, 2: 0, 1: 0 }
};

describe('GetProductCommentsUseCase', () => {
  let getProductCommentsUseCase: GetProductCommentsUseCase;

  beforeEach(() => {
    vi.clearAllMocks();
    getProductCommentsUseCase = new GetProductCommentsUseCase(mockCommentRepository);
  });

  it('should return comments for a product', async () => {
    // Arrange
    mockCommentRepository.findByProductId.mockResolvedValue(mockComments);

    // Act
    const result = await getProductCommentsUseCase.execute('1');

    // Assert
    expect(result).toEqual(mockComments);
    expect(mockCommentRepository.findByProductId).toHaveBeenCalledWith('1');
  });

  it('should return empty array when no comments exist', async () => {
    // Arrange
    mockCommentRepository.findByProductId.mockResolvedValue([]);

    // Act
    const result = await getProductCommentsUseCase.execute('999');

    // Assert
    expect(result).toEqual([]);
    expect(mockCommentRepository.findByProductId).toHaveBeenCalledWith('999');
  });

  it('should handle numeric product ID', async () => {
    // Arrange
    mockCommentRepository.findByProductId.mockResolvedValue(mockComments);

    // Act
    const result = await getProductCommentsUseCase.execute(1);

    // Assert
    expect(result).toEqual(mockComments);
    expect(mockCommentRepository.findByProductId).toHaveBeenCalledWith(1);
  });

  it('should return review summary for a product', async () => {
    // Arrange
    mockCommentRepository.getReviewSummary.mockResolvedValue(mockSummary);

    // Act
    const result = await getProductCommentsUseCase.getReviewSummary('1');

    // Assert
    expect(result).toEqual(mockSummary);
    expect(mockCommentRepository.getReviewSummary).toHaveBeenCalledWith('1');
  });

  it('should handle repository errors gracefully', async () => {
    // Arrange
    mockCommentRepository.findByProductId.mockRejectedValue(new Error('Database error'));

    // Act & Assert
    await expect(getProductCommentsUseCase.execute('1')).rejects.toThrow('Database error');
  });
}); 