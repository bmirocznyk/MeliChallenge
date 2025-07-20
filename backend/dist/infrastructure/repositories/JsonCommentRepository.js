import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export class JsonCommentRepository {
    comments = {};
    constructor() {
        this.loadComments();
    }
    loadComments() {
        try {
            const dataPath = join(__dirname, '../database/comments.json');
            const data = readFileSync(dataPath, 'utf-8');
            this.comments = JSON.parse(data);
        }
        catch (error) {
            console.error('Error loading comments:', error);
            this.comments = {};
        }
    }
    async findByProductId(productId) {
        return this.comments[productId] || [];
    }
    async calculateAverageRating(productId) {
        const comments = this.comments[productId] || [];
        if (comments.length === 0)
            return 0;
        const totalRating = comments.reduce((sum, comment) => sum + comment.rating, 0);
        return Math.round((totalRating / comments.length) * 10) / 10; // Round to 1 decimal
    }
    async getReviewSummary(productId) {
        const comments = this.comments[productId] || [];
        const averageRating = await this.calculateAverageRating(productId);
        // Calculate rating distribution
        const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        comments.forEach(comment => {
            ratingDistribution[comment.rating]++;
        });
        return {
            averageRating,
            totalReviews: comments.length,
            ratingDistribution
        };
    }
}
