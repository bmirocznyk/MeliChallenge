import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export class JsonProductRepository {
    products = [];
    constructor() {
        this.loadProducts();
    }
    loadProducts() {
        try {
            const dataPath = join(__dirname, '../database/products.json');
            const data = readFileSync(dataPath, 'utf-8');
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
        const data = await fs.readFile('src/infrastructure/database/comments.json', 'utf-8');
        const comments = JSON.parse(data);
        return comments[String(productId)] || [];
    }
}
