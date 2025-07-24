"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonCommentRepository = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
class JsonCommentRepository {
    dataPath;
    constructor() {
        this.dataPath = path_1.default.join(__dirname, '../database/comments.json');
    }
    async loadComments() {
        try {
            const data = await promises_1.default.readFile(this.dataPath, 'utf-8');
            return JSON.parse(data);
        }
        catch (error) {
            console.error('Error loading comments:', error);
            return {};
        }
    }
    async findByProductId(productId) {
        const comments = await this.loadComments();
        return comments[String(productId)] || [];
    }
    async getReviewSummary(productId) {
        const comments = await this.findByProductId(productId);
        if (comments.length === 0) {
            return {
                averageRating: 0,
                totalReviews: 0,
                ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
            };
        }
        const totalRating = comments.reduce((sum, comment) => sum + comment.rating, 0);
        const averageRating = totalRating / comments.length;
        const ratingDistribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        comments.forEach(comment => {
            const rating = comment.rating;
            if (ratingDistribution[rating] !== undefined) {
                ratingDistribution[rating]++;
            }
        });
        return {
            averageRating: Math.round(averageRating * 10) / 10,
            totalReviews: comments.length,
            ratingDistribution
        };
    }
}
exports.JsonCommentRepository = JsonCommentRepository;
