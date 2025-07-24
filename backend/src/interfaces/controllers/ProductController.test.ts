import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ProductController } from './ProductController';
import { Request, Response } from 'express';
import { GetProductUseCase } from '../../application/use-cases/GetProductUseCase';
import { GetProductCommentsUseCase } from '../../application/use-cases/GetProductCommentsUseCase';
import { GetPaymentMethodsUseCase } from '../../application/use-cases/GetPaymentMethodsUseCase';
import { GetSellerUseCase } from '../../application/use-cases/GetSellerUseCase';

function mockRes() {
  const res: Partial<Response> = {};
  res.status = vi.fn().mockReturnThis();
  res.json = vi.fn().mockReturnThis();
  res.send = vi.fn().mockReturnThis();
  return res as Response;
}

// Subclass to inject mocks for private properties
class TestableProductController extends ProductController {
  public setUseCases(
    getProductUseCase: GetProductUseCase,
    getProductCommentsUseCase: GetProductCommentsUseCase,
    getPaymentMethodsUseCase: GetPaymentMethodsUseCase,
    getSellerUseCase: GetSellerUseCase
  ) {
    // @ts-expect-error: access private
    this.getProductUseCase = getProductUseCase;
    // @ts-expect-error: access private
    this.getProductCommentsUseCase = getProductCommentsUseCase;
    // @ts-expect-error: access private
    this.getPaymentMethodsUseCase = getPaymentMethodsUseCase;
    // @ts-expect-error: access private
    this.getSellerUseCase = getSellerUseCase;
  }
}

describe('ProductController', () => {
  let controller: TestableProductController;
  let getProductUseCase: GetProductUseCase;
  let getProductCommentsUseCase: GetProductCommentsUseCase;
  let getPaymentMethodsUseCase: GetPaymentMethodsUseCase;
  let getSellerUseCase: GetSellerUseCase;

  beforeEach(() => {
    getProductUseCase = { execute: vi.fn() } as any;
    getProductCommentsUseCase = { execute: vi.fn(), getReviewSummary: vi.fn() } as any;
    getPaymentMethodsUseCase = { execute: vi.fn(), executeByIds: vi.fn() } as any;
    getSellerUseCase = { execute: vi.fn() } as any;
    controller = new TestableProductController();
    controller.setUseCases(getProductUseCase, getProductCommentsUseCase, getPaymentMethodsUseCase, getSellerUseCase);
  });

  it('getProduct returns product if found', async () => {
    const req = { params: { id: '1' } } as unknown as Request;
    const res = mockRes();
    (getProductUseCase.execute as any).mockResolvedValue({ id: '1', title: 'Test' });
    await controller.getProduct(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ id: '1', title: 'Test' });
  });

  it('getProduct returns 404 if not found', async () => {
    const req = { params: { id: '999' } } as unknown as Request;
    const res = mockRes();
    (getProductUseCase.execute as any).mockResolvedValue(null);
    await controller.getProduct(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: 'Product not found' }));
  });

  it('getProduct handles errors', async () => {
    const req = { params: { id: '1' } } as unknown as Request;
    const res = mockRes();
    (getProductUseCase.execute as any).mockRejectedValue(new Error('fail'));
    await controller.getProduct(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: 'Internal server error' }));
  });

  it('getProductComments returns comments', async () => {
    const req = { params: { id: '1' } } as unknown as Request;
    const res = mockRes();
    (getProductCommentsUseCase.execute as any).mockResolvedValue([{ id: 1 }]);
    (getProductCommentsUseCase.getReviewSummary as any).mockResolvedValue({});
    await controller.getProductComments(req, res);
    expect(res.status).not.toHaveBeenCalled(); // No status set for success
    expect(res.json).toHaveBeenCalledWith({ comments: [{ id: 1 }], summary: {} });
  });

  it('getProductComments handles errors', async () => {
    const req = { params: { id: '1' } } as unknown as Request;
    const res = mockRes();
    (getProductCommentsUseCase.execute as any).mockRejectedValue(new Error('fail'));
    await controller.getProductComments(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: 'Internal server error' }));
  });

  it('getPaymentMethods returns methods', async () => {
    const req = {} as Request;
    const res = mockRes();
    (getPaymentMethodsUseCase.execute as any).mockResolvedValue([{ id: 1 }]);
    await controller.getPaymentMethods(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ id: 1 }]);
  });

  it('getPaymentMethods handles errors', async () => {
    const req = {} as Request;
    const res = mockRes();
    (getPaymentMethodsUseCase.execute as any).mockRejectedValue(new Error('fail'));
    await controller.getPaymentMethods(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: 'Internal server error' }));
  });

  it('getPaymentMethodsByIds returns methods', async () => {
    const req = { query: { ids: '1,2' } } as unknown as Request;
    const res = mockRes();
    (getPaymentMethodsUseCase.executeByIds as any).mockResolvedValue([{ id: 1 }]);
    await controller.getPaymentMethodsByIds(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ id: 1 }]);
  });

  it('getPaymentMethodsByIds handles errors', async () => {
    const req = { query: { ids: '1,2' } } as unknown as Request;
    const res = mockRes();
    (getPaymentMethodsUseCase.executeByIds as any).mockRejectedValue(new Error('fail'));
    await controller.getPaymentMethodsByIds(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: 'Internal server error' }));
  });

  it('getProductWithPaymentMethods returns product with methods', async () => {
    const req = { params: { id: '1' } } as unknown as Request;
    const res = mockRes();
    (getProductUseCase.execute as any).mockResolvedValue({ id: '1' });
    (getPaymentMethodsUseCase.executeByIds as any).mockResolvedValue([{ id: 1 }]);
    await controller.getProductWithPaymentMethods(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ id: '1', paymentMethods: [{ id: 1 }] });
  });

  it('getProductWithPaymentMethods handles errors', async () => {
    const req = { params: { id: '1' } } as unknown as Request;
    const res = mockRes();
    (getProductUseCase.execute as any).mockRejectedValue(new Error('fail'));
    await controller.getProductWithPaymentMethods(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: 'Internal server error' }));
  });

  it('getSeller returns seller', async () => {
    const req = { params: { id: '1' } } as unknown as Request;
    const res = mockRes();
    (getSellerUseCase.execute as any).mockResolvedValue({ id: '1' });
    await controller.getSeller(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ id: '1' });
  });

  it('getSeller returns 404 if not found', async () => {
    const req = { params: { id: '999' } } as unknown as Request;
    const res = mockRes();
    (getSellerUseCase.execute as any).mockResolvedValue(null);
    await controller.getSeller(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: 'Seller not found' }));
  });

  it('getSeller handles errors', async () => {
    const req = { params: { id: '1' } } as unknown as Request;
    const res = mockRes();
    (getSellerUseCase.execute as any).mockRejectedValue(new Error('fail'));
    await controller.getSeller(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: 'Internal server error' }));
  });
}); 