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
    async findAll() {
        return this.sellers;
    }
    async findById(id) {
        const sellerId = typeof id === 'string' ? parseInt(id) : id;
        return this.sellers.find(seller => seller.id === sellerId) || null;
    }
    async findByIds(ids) {
        return this.sellers.filter(seller => ids.some(id => {
            const numericId = typeof id === 'string' ? parseInt(id) : id;
            const sellerIdNum = typeof seller.id === 'string' ? parseInt(seller.id) : seller.id;
            return numericId === sellerIdNum;
        }));
    }
    async findByType(type) {
        return this.sellers.filter(seller => seller.type === type);
    }
    async findVerified() {
        return this.sellers.filter(seller => seller.verified === true);
    }
}
exports.JsonSellerRepository = JsonSellerRepository;
