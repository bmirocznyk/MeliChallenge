"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPurchaseRoutes = createPurchaseRoutes;
const express_1 = require("express");
function createPurchaseRoutes(purchaseController) {
    const router = (0, express_1.Router)();
    router.post('/purchase', purchaseController.purchase.bind(purchaseController));
    return router;
}
