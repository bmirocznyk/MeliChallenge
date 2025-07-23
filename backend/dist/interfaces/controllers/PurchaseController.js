"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseController = void 0;
const PurchaseProductUseCase_1 = require("../../application/use-cases/PurchaseProductUseCase");
const JsonProductRepository_1 = require("../../infrastructure/repositories/JsonProductRepository");
class PurchaseController {
    purchaseProductUseCase;
    constructor() {
        const productRepository = new JsonProductRepository_1.JsonProductRepository();
        this.purchaseProductUseCase = new PurchaseProductUseCase_1.PurchaseProductUseCase(productRepository);
    }
    async purchase(req, res) {
        try {
            const { productId, quantity } = req.body;
            if (!productId || !quantity || quantity <= 0) {
                res.status(400).json({ error: 'Invalid productId or quantity' });
                return;
            }
            const result = await this.purchaseProductUseCase.execute(productId, quantity);
            if (!result.success) {
                res.status(400).json({ error: result.message });
                return;
            }
            res.json(result.product);
        }
        catch (error) {
            console.error('Error purchasing product:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
exports.PurchaseController = PurchaseController;
