import { describe, it, expect, vi, beforeEach, type Mocked } from 'vitest';
import { GetSellerUseCase } from './GetSellerUseCase';
import { Seller } from '../../shared/types/product';
import { SellerRepository } from '../../domain/repositories/SellerRepository';

describe('GetSellerUseCase', () => {
  let sellerRepository: Mocked<SellerRepository>;
  let useCase: GetSellerUseCase;

  const mockSeller: Seller = {
    id: '1',
    name: 'Test Seller',
    reputation: 'green',
    level: 'gold',
    isOfficialStore: true,
  };

  beforeEach(() => {
    sellerRepository = {
      findById: vi.fn(),
    };
    useCase = new GetSellerUseCase(sellerRepository);
  });

  it('returns a seller when found', async () => {
    sellerRepository.findById.mockResolvedValue(mockSeller);
    const result = await useCase.execute('1');
    expect(result).toEqual(mockSeller);
    expect(sellerRepository.findById).toHaveBeenCalledWith('1');
  });

  it('returns null if seller is not found', async () => {
    sellerRepository.findById.mockResolvedValue(null);
    const result = await useCase.execute('999');
    expect(result).toBeNull();
    expect(sellerRepository.findById).toHaveBeenCalledWith('999');
  });

  it('throws if repository throws', async () => {
    sellerRepository.findById.mockRejectedValue(new Error('DB error'));
    await expect(useCase.execute('1')).rejects.toThrow('DB error');
  });
}); 