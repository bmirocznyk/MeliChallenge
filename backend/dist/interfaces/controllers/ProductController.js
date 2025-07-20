export class ProductController {
    getProductUseCase;
    getAllProductsUseCase;
    searchProductsUseCase;
    getProductCommentsUseCase;
    constructor(getProductUseCase, getAllProductsUseCase, searchProductsUseCase, getProductCommentsUseCase) {
        this.getProductUseCase = getProductUseCase;
        this.getAllProductsUseCase = getAllProductsUseCase;
        this.searchProductsUseCase = searchProductsUseCase;
        this.getProductCommentsUseCase = getProductCommentsUseCase;
    }
    async getProduct(req, res) {
        try {
            const { id } = req.params;
            const product = await this.getProductUseCase.execute(id);
            if (!product) {
                res.status(404).json({
                    error: 'Product not found',
                    message: `Product with id ${id} was not found`
                });
                return;
            }
            res.json(product);
        }
        catch (error) {
            console.error('Error getting product:', error);
            res.status(500).json({
                error: 'Internal server error',
                message: 'An error occurred while retrieving the product'
            });
        }
    }
    async getAllProducts(req, res) {
        try {
            const products = await this.getAllProductsUseCase.execute();
            res.json(products);
        }
        catch (error) {
            console.error('Error getting all products:', error);
            res.status(500).json({
                error: 'Internal server error',
                message: 'An error occurred while retrieving products'
            });
        }
    }
    async searchProducts(req, res) {
        try {
            const { q } = req.query;
            if (!q || typeof q !== 'string') {
                res.status(400).json({
                    error: 'Bad request',
                    message: 'Search query parameter "q" is required'
                });
                return;
            }
            const products = await this.searchProductsUseCase.execute(q);
            res.json(products);
        }
        catch (error) {
            console.error('Error searching products:', error);
            res.status(500).json({
                error: 'Internal server error',
                message: 'An error occurred while searching products'
            });
        }
    }
    async getProductComments(req, res) {
        try {
            const { id } = req.params;
            const comments = await this.getProductCommentsUseCase.execute(id);
            const reviewSummary = await this.getProductCommentsUseCase.getReviewSummary(id);
            res.json({
                comments,
                summary: reviewSummary
            });
        }
        catch (error) {
            console.error('Error getting product comments:', error);
            res.status(500).json({
                error: 'Internal server error',
                message: 'An error occurred while retrieving product comments'
            });
        }
    }
}
