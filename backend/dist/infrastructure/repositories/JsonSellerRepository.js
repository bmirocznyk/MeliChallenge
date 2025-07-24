"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonSellerRepository = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
class JsonSellerRepository {
    sellers = [];
    constructor() {
        this.loadSellers();
    }
    loadSellers() {
        try {
            const dataPath = (0, path_1.join)(__dirname, '../database/sellers.json');
            const data = (0, fs_1.readFileSync)(dataPath, 'utf-8');
            this.sellers = JSON.parse(data);
        }
        catch (error) {
            console.error('Error loading sellers:', error);
            this.sellers = [];
        }
    }
    async findById(id) {
        const sellerId = typeof id === 'string' ? parseInt(id) : id;
        return this.sellers.find(seller => seller.id === sellerId) || null;
    }
}
exports.JsonSellerRepository = JsonSellerRepository;
