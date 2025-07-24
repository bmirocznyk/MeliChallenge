"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonProductRepository = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
class JsonProductRepository {
    dataPath;
    lastProductUpdated = null;
    constructor() {
        this.dataPath = (0, path_1.join)(__dirname, '../database/products.json');
    }
    // Siempre lee el archivo JSON desde disco para reflejar cualquier cambio manual o externo.
    loadProducts() {
        try {
            const data = (0, fs_1.readFileSync)(this.dataPath, 'utf-8');
            return JSON.parse(data);
        }
        catch (error) {
            console.error('Error loading products:', error);
            return [];
        }
    }
    async findById(id) {
        const products = this.loadProducts();
        const product = products.find(p => p.id == id) || null;
        // Guardamos referencia para persistir cambios en saveProducts
        this.lastProductUpdated = product ? { ...product } : null;
        return product;
    }
    async saveProducts() {
        if (!this.lastProductUpdated)
            return;
        const products = this.loadProducts();
        const idx = products.findIndex(p => p.id == this.lastProductUpdated.id);
        if (idx !== -1) {
            products[idx] = this.lastProductUpdated;
            try {
                (0, fs_1.writeFileSync)(this.dataPath, JSON.stringify(products, null, 2), 'utf-8');
            }
            catch (error) {
                console.error('Error saving products:', error);
                throw new Error('Failed to save products');
            }
        }
    }
}
exports.JsonProductRepository = JsonProductRepository;
