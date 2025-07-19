import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { repositoryFactory } from './config/RepositoryFactory.js';
import { ProductService } from './services/ProductService.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(helmet());

// Inicializar repositorios y servicios
let productService;
let repositories;

async function initializeApp() {
  try {
    // Crear todos los repositorios usando el factory
    repositories = repositoryFactory.createAllRepositories();
    
    // Crear servicio de productos con repositorios
    productService = new ProductService(
      repositories.products,
      repositories.categories,
      repositories.sellers,
      repositories.images,
      repositories.priceHistory
    );
    
    console.log(`Using ${repositoryFactory.dataSource} as data source`);
    console.log('Application initialized successfully');
  } catch (error) {
    console.error('Failed to initialize application:', error);
    process.exit(1);
  }
}

// GET /api/items/:id - Legacy endpoint (mantiene compatibilidad)
app.get('/api/items/:id', async (req, res) => {
  try {
    const product = await productService.getProductWithDetails(req.params.id);
    
    // Transformar a formato legacy para compatibilidad
    const legacyData = {
      ...product,
      categories: product.category ? [product.category] : [],
      shipping: product.availability?.shipping || null,
      installments: product.payment?.installments || null
    };
    
    res.json(legacyData);
  } catch (error) {
    if (error.message === 'Product not found') {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/products/:id - Get product information
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await repositories.products.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/products/:id/complete - Get complete product with all relations
app.get('/api/products/:id/complete', async (req, res) => {
  try {
    const product = await productService.getProductWithDetails(req.params.id);
    res.json(product);
  } catch (error) {
    if (error.message === 'Product not found') {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/categories/:id - Get category information
app.get('/api/categories/:id', async (req, res) => {
  try {
    const category = await repositories.categories.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/categories/:id/products - Get all products in a category
app.get('/api/categories/:id/products', async (req, res) => {
  try {
    const products = await productService.getProductsByCategory(req.params.id);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/sellers/:id - Get seller information
app.get('/api/sellers/:id', async (req, res) => {
  try {
    const seller = await repositories.sellers.findById(req.params.id);
    
    if (!seller) {
      return res.status(404).json({ error: 'Seller not found' });
    }
    
    res.json(seller);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/sellers/:id/products - Get all products from a seller
app.get('/api/sellers/:id/products', async (req, res) => {
  try {
    const products = await productService.getProductsBySeller(req.params.id);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/images/:productId - Get all images for a product
app.get('/api/images/:productId', async (req, res) => {
  try {
    const images = await repositories.images.findBy({ 
      productId: Number(req.params.productId) 
    });
    
    if (images.length === 0) {
      return res.status(404).json({ error: 'Images not found for this product' });
    }
    
    // Sort by order
    images.sort((a, b) => a.order - b.order);
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/price-history/:productId - Get price history for a product
app.get('/api/price-history/:productId', async (req, res) => {
  try {
    const priceHistory = await repositories.priceHistory.findBy({ 
      productId: Number(req.params.productId) 
    });
    
    if (priceHistory.length === 0) {
      return res.status(404).json({ error: 'Price history not found for this product' });
    }
    
    // Sort by date (newest first)
    priceHistory.sort((a, b) => new Date(b.date) - new Date(a.date));
    res.json(priceHistory);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/reviews/:productId - Get reviews and ratings for a product
app.get('/api/reviews/:productId', async (req, res) => {
  try {
    const reviewData = await repositories.reviews.findBy({ 
      productId: Number(req.params.productId) 
    });
    
    if (reviewData.length === 0) {
      return res.status(404).json({ error: 'Reviews not found for this product' });
    }
    
    res.json(reviewData[0].reviews);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/availability/:productId - Get availability and shipping info
app.get('/api/availability/:productId', async (req, res) => {
  try {
    const availabilityData = await repositories.availability.findBy({ 
      productId: Number(req.params.productId) 
    });
    
    if (availabilityData.length === 0) {
      return res.status(404).json({ error: 'Availability not found for this product' });
    }
    
    res.json(availabilityData[0].availability);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/payment/:productId - Get payment and installment information
app.get('/api/payment/:productId', async (req, res) => {
  try {
    const paymentData = await repositories.payment.findBy({ 
      productId: Number(req.params.productId) 
    });
    
    if (paymentData.length === 0) {
      return res.status(404).json({ error: 'Payment information not found for this product' });
    }
    
    res.json(paymentData[0].payment);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/products/:id/price - Update product price
app.post('/api/products/:id/price', express.json(), async (req, res) => {
  try {
    const { price } = req.body;
    
    if (!price || typeof price !== 'number') {
      return res.status(400).json({ error: 'Valid price is required' });
    }
    
    const updatedProduct = await productService.updateProductPrice(req.params.id, price);
    res.json(updatedProduct);
  } catch (error) {
    if (error.message === 'Product not found') {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/search/products - Search products with filters
app.get('/api/search/products', async (req, res) => {
  try {
    const filters = {
      categoryId: req.query.categoryId,
      sellerId: req.query.sellerId,
      brand: req.query.brand,
      minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
      maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
      condition: req.query.condition,
      sortBy: req.query.sortBy
    };
    
    const products = await productService.searchProducts(filters);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Inicializar y arrancar el servidor
initializeApp().then(() => {
  app.listen(PORT, () => {
    console.log(`Backend API running on http://localhost:${PORT}`);
    console.log('Available endpoints:');
    console.log('  GET /api/items/:id - Legacy endpoint (combined data)');
    console.log('  GET /api/products/:id - Product information');
    console.log('  GET /api/products/:id/complete - Complete product with all relations');
    console.log('  GET /api/categories/:id - Category information');
    console.log('  GET /api/categories/:id/products - Products in category');
    console.log('  GET /api/sellers/:id - Seller information');
    console.log('  GET /api/sellers/:id/products - Products from seller');
    console.log('  GET /api/images/:productId - Product images');
    console.log('  GET /api/price-history/:productId - Price history');
    console.log('  GET /api/reviews/:productId - Reviews and ratings');
    console.log('  GET /api/availability/:productId - Availability and shipping');
    console.log('  GET /api/payment/:productId - Payment and installments');
    console.log('  POST /api/products/:id/price - Update product price');
    console.log('  GET /api/search/products - Search products with filters');
  });
}); 