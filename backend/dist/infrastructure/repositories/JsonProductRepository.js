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
    dataPath;
    constructor() {
        this.dataPath = (0, path_1.join)(__dirname, '../database/products.json');
        this.loadProducts();
    }
    loadProducts() {
        try {
            const data = (0, fs_1.readFileSync)(this.dataPath, 'utf-8');
            this.products = JSON.parse(data);
        }
        catch (error) {
            console.error('Error loading products:', error);
            this.products = [];
        }
    }
    async findAll() {
        return [...this.products];
    }
    async findById(id) {
        const product = this.products.find(p => p.id == id);
        return product || null;
    }
    async findByCategory(categoryId) {
        return this.products.filter(product => product.categories.some(category => category.id == categoryId));
    }
    async search(query) {
        if (!query || query.trim() === '') {
            return [];
        }
        const searchTerm = query.toLowerCase().trim();
        return this.products.filter(product => {
            const titleMatch = product.title.toLowerCase().includes(searchTerm);
            const descriptionMatch = product.description.toLowerCase().includes(searchTerm);
            return titleMatch || descriptionMatch;
        });
    }
    async getProductComments(productId) {
        try {
            const commentsPath = (0, path_1.join)(__dirname, '../database/comments.json');
            const data = await promises_1.default.readFile(commentsPath, 'utf-8');
            const comments = JSON.parse(data);
            return comments[String(productId)] || [];
        }
        catch (error) {
            console.error('Error loading comments:', error);
            throw error;
        }
    }
    async saveProducts() {
        try {
            const data = JSON.stringify(this.products, null, 2);
            await promises_1.default.writeFile(this.dataPath, data, 'utf-8');
        }
        catch (error) {
            console.error('Error saving products:', error);
            throw error;
        }
    }
}
exports.JsonProductRepository = JsonProductRepository;
