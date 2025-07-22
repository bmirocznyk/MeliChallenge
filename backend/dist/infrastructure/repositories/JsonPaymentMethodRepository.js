"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonPaymentMethodRepository = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
class JsonPaymentMethodRepository {
    dataPath;
    constructor() {
        this.dataPath = path_1.default.join(__dirname, '../database/payment-methods.json');
    }
    async loadPaymentMethods() {
        try {
            const data = await promises_1.default.readFile(this.dataPath, 'utf-8');
            return JSON.parse(data);
        }
        catch (error) {
            console.error('Error loading payment methods:', error);
            return [];
        }
    }
    async findAll() {
        return this.loadPaymentMethods();
    }
    async findById(id) {
        const paymentMethods = await this.loadPaymentMethods();
        return paymentMethods.find(pm => pm.id === id) || null;
    }
    async findByIds(ids) {
        const paymentMethods = await this.loadPaymentMethods();
        return paymentMethods.filter(pm => ids.includes(pm.id));
    }
    async findByCategory(category) {
        const paymentMethods = await this.loadPaymentMethods();
        return paymentMethods.filter(pm => pm.category === category);
    }
    async findEnabled() {
        const paymentMethods = await this.loadPaymentMethods();
        return paymentMethods.filter(pm => pm.enabled);
    }
}
exports.JsonPaymentMethodRepository = JsonPaymentMethodRepository;
