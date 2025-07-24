import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { JsonCommentRepository } from './JsonCommentRepository';
import * as fs from 'fs/promises';

vi.mock('fs/promises');

describe('JsonCommentRepository', () => {
  let repository: JsonCommentRepository;
  const mockComments = {
    '1': [
      { id: 1, user: 'maria_gonzalez', rating: 5, comment: 'Excelente producto, llegó rápido y en perfectas condiciones. La cámara de 48MP es espectacular.', date: '2024-01-20' },
      { id: 2, user: 'juan_perez', rating: 4, comment: 'Muy buen teléfono, aunque esperaba más de la batería. El diseño de titanio se siente premium.', date: '2024-01-18' }
    ]
  };

  beforeEach(() => {
    repository = new JsonCommentRepository();
    (fs.readFile as any).mockResolvedValue(JSON.stringify(mockComments));
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('findByProductId returns comments for a product', async () => {
    const comments = await repository.findByProductId('1');
    expect(comments).toEqual(mockComments['1']);
  });

  it('findByProductId returns empty array if no comments', async () => {
    const comments = await repository.findByProductId('999');
    expect(comments).toEqual([]);
  });

  it('findByProductId handles JSON parse error gracefully', async () => {
    (fs.readFile as any).mockImplementation(() => { throw new Error('read error'); });
    const comments = await repository.findByProductId('1');
    expect(comments).toEqual([]);
  });

  it('getReviewSummary returns summary for a product', async () => {
    const summary = await repository.getReviewSummary('1');
    expect(summary).toBeDefined();
    expect(summary.averageRating).toBeGreaterThanOrEqual(0);
  });

  it('getReviewSummary returns summary with zeros if no comments', async () => {
    const summary = await repository.getReviewSummary('999');
    expect(summary).toEqual({
      averageRating: 0,
      totalReviews: 0,
      ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    });
  });

  it('getReviewSummary handles JSON parse error gracefully', async () => {
    (fs.readFile as any).mockImplementation(() => { throw new Error('read error'); });
    const summary = await repository.getReviewSummary('1');
    expect(summary).toEqual({
      averageRating: 0,
      totalReviews: 0,
      ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    });
  });
}); 