import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PurchaseController } from './PurchaseController';
import { Request, Response } from 'express';
import { PurchaseProductUseCase } from '../../application/use-cases/PurchaseProductUseCase';

function mockRes() {
  const res: Partial<Response> = {};
  res.status = vi.fn().mockReturnThis();
  res.json = vi.fn().mockReturnThis();
  res.send = vi.fn().mockReturnThis();
  return res as Response;
}

class TestablePurchaseController extends PurchaseController {
  public setUseCase(purchaseProductUseCase: PurchaseProductUseCase) {
    // @ts-expect-error: access private
    this.purchaseProductUseCase = purchaseProductUseCase;
  }
}

describe('PurchaseController', () => {
  let controller: TestablePurchaseController;
  let purchaseProductUseCase: PurchaseProductUseCase;

  beforeEach(() => {
    purchaseProductUseCase = { execute: vi.fn() } as any;
    controller = new TestablePurchaseController();
    controller.setUseCase(purchaseProductUseCase);
  });

  it('purchase returns success', async () => {
    const req = { body: { productId: '1', quantity: 2 } } as unknown as Request;
    const res = mockRes();
    (purchaseProductUseCase.execute as any).mockResolvedValue({ success: true, product: { id: '1' } });
    await controller.purchase(req, res);
    expect(res.status).not.toHaveBeenCalled(); // No status set for success
    expect(res.json).toHaveBeenCalledWith({ id: '1' });
  });

  it('purchase returns 400 if missing params', async () => {
    const req = { body: {} } as unknown as Request;
    const res = mockRes();
    await controller.purchase(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid productId or quantity' });
  });

  it('purchase returns 400 if not successful', async () => {
    const req = { body: { productId: '1', quantity: 2 } } as unknown as Request;
    const res = mockRes();
    (purchaseProductUseCase.execute as any).mockResolvedValue({ success: false, message: 'No stock' });
    await controller.purchase(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'No stock' });
  });

  it('purchase handles errors', async () => {
    const req = { body: { productId: '1', quantity: 2 } } as unknown as Request;
    const res = mockRes();
    (purchaseProductUseCase.execute as any).mockRejectedValue(new Error('fail'));
    await controller.purchase(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
  });
}); 