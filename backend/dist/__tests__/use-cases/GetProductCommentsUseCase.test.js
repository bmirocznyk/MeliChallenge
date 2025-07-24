"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const GetProductCommentsUseCase_1 = require("../../application/use-cases/GetProductCommentsUseCase");
// Mock repository
const mockCommentRepository = {
    findByProductId: vitest_1.vi.fn(),
    getReviewSummary: vitest_1.vi.fn()
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
(0, vitest_1.describe)('GetProductCommentsUseCase', () => {
    let getProductCommentsUseCase;
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vi.clearAllMocks();
        getProductCommentsUseCase = new GetProductCommentsUseCase_1.GetProductCommentsUseCase(mockCommentRepository);
    });
    (0, vitest_1.it)('should return comments for a product', async () => {
        // Arrange
        mockCommentRepository.findByProductId.mockResolvedValue(mockComments);
        // Act
        const result = await getProductCommentsUseCase.execute('1');
        // Assert
        (0, vitest_1.expect)(result).toEqual(mockComments);
        (0, vitest_1.expect)(mockCommentRepository.findByProductId).toHaveBeenCalledWith('1');
    });
    (0, vitest_1.it)('should return empty array when no comments exist', async () => {
        // Arrange
        mockCommentRepository.findByProductId.mockResolvedValue([]);
        // Act
        const result = await getProductCommentsUseCase.execute('999');
        // Assert
        (0, vitest_1.expect)(result).toEqual([]);
        (0, vitest_1.expect)(mockCommentRepository.findByProductId).toHaveBeenCalledWith('999');
    });
    (0, vitest_1.it)('should handle numeric product ID', async () => {
        // Arrange
        mockCommentRepository.findByProductId.mockResolvedValue(mockComments);
        // Act
        const result = await getProductCommentsUseCase.execute(1);
        // Assert
        (0, vitest_1.expect)(result).toEqual(mockComments);
        (0, vitest_1.expect)(mockCommentRepository.findByProductId).toHaveBeenCalledWith(1);
    });
    (0, vitest_1.it)('should return review summary for a product', async () => {
        // Arrange
        mockCommentRepository.getReviewSummary.mockResolvedValue(mockSummary);
        // Act
        const result = await getProductCommentsUseCase.getReviewSummary('1');
        // Assert
        (0, vitest_1.expect)(result).toEqual(mockSummary);
        (0, vitest_1.expect)(mockCommentRepository.getReviewSummary).toHaveBeenCalledWith('1');
    });
    (0, vitest_1.it)('should handle repository errors gracefully', async () => {
        // Arrange
        mockCommentRepository.findByProductId.mockRejectedValue(new Error('Database error'));
        // Act & Assert
        await (0, vitest_1.expect)(getProductCommentsUseCase.execute('1')).rejects.toThrow('Database error');
    });
});
