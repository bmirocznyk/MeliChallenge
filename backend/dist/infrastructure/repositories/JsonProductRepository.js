"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonProductRepository = void 0;
const fs_1 = require("fs");
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = require("path");
class JsonProductRepository {
    products = [];
    constructor() {
        this.loadProducts();
    }
    loadProducts() {
        try {
            const dataPath = (0, path_1.join)(__dirname, '../database/products.json');
            const data = (0, fs_1.readFileSync)(dataPath, 'utf-8');
            this.products = JSON.parse(data);
        }
        catch (error) {
            console.error('Error loading products:', error);
            this.products = [];
        }
    }
    async findAll() {
        return this.products;
    }
    async findById(id) {
        const product = this.products.find(p => p.id == id);
        return product || null;
    }
    async findByCategory(categoryId) {
        return this.products.filter(product => product.categories.some(category => category.id == categoryId));
    }
    async search(query) {
        const lowerQuery = query.toLowerCase();
        return this.products.filter(product => product.title.toLowerCase().includes(lowerQuery) ||
            product.description.toLowerCase().includes(lowerQuery) ||
            product.brand?.toLowerCase().includes(lowerQuery) ||
            product.model?.toLowerCase().includes(lowerQuery));
    }
    async getProductComments(productId) {
        const data = await promises_1.default.readFile('src/infrastructure/database/comments.json', 'utf-8');
        const comments = JSON.parse(data);
        return comments[String(productId)] || [];
    }
}
exports.JsonProductRepository = JsonProductRepository;
