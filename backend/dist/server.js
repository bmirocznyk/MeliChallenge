"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
// Routes
const ProductRoutes_js_1 = require("./interfaces/routes/ProductRoutes.js");
const ProductController_js_1 = require("./interfaces/controllers/ProductController.js");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
    credentials: true
}));
app.use((0, morgan_1.default)('combined'));
app.use(express_1.default.json());
// Routes
const productController = new ProductController_js_1.ProductController();
const apiRoutes = (0, ProductRoutes_js_1.createProductRoutes)(productController);
app.use('/api', apiRoutes);
// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'MercadoLibre Backend API is running',
        timestamp: new Date().toISOString()
    });
});
// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'MercadoLibre Backend API',
        version: '1.0.0',
        endpoints: {
            health: '/api/health',
            products: '/api/products',
            productById: '/api/products/:id',
            search: '/api/products/search?q=query',
            sellers: '/api/sellers',
            sellerById: '/api/sellers/:id',
            paymentMethods: '/api/payment-methods'
        }
    });
});
// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: `Route ${req.originalUrl} not found`
    });
});
// Error handler
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
        error: 'Internal Server Error',
        message: 'An unexpected error occurred'
    });
});
app.listen(PORT, () => {
    console.log(`🚀 MercadoLibre Backend API running on http://localhost:${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
    console.log(`📦 Products API: http://localhost:${PORT}/api/products`);
});
