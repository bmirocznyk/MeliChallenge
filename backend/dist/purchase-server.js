"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const PurchaseRoutes_1 = require("./interfaces/routes/PurchaseRoutes");
const PurchaseController_1 = require("./interfaces/controllers/PurchaseController");
const app = (0, express_1.default)();
const PORT = process.env.PURCHASE_PORT || 3002;
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
    credentials: true
}));
app.use((0, morgan_1.default)('combined'));
app.use(express_1.default.json());
const purchaseController = new PurchaseController_1.PurchaseController();
const purchaseRoutes = (0, PurchaseRoutes_1.createPurchaseRoutes)(purchaseController);
app.use('/api', purchaseRoutes);
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Purchase Service is running',
        timestamp: new Date().toISOString()
    });
});
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: `Route ${req.originalUrl} not found`
    });
});
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
        error: 'Internal Server Error',
        message: 'An unexpected error occurred'
    });
});
app.listen(PORT, () => {
    console.log(`🛒 Purchase Service running on http://localhost:${PORT}`);
    console.log(`📦 Purchase endpoint: http://localhost:${PORT}/api/purchase`);
});
