/**
 * Servicio de Productos
 * Maneja la lógica de negocio usando repositorios que implementan IRepository
 */
export class ProductService {
  constructor(productRepository, categoryRepository, sellerRepository, imageRepository, priceHistoryRepository) {
    this.productRepository = productRepository;
    this.categoryRepository = categoryRepository;
    this.sellerRepository = sellerRepository;
    this.imageRepository = imageRepository;
    this.priceHistoryRepository = priceHistoryRepository;
  }

  /**
   * Obtiene un producto con toda su información relacionada
   */
  async getProductWithDetails(productId) {
    try {
      // Obtener producto básico
      const product = await this.productRepository.findById(productId);
      if (!product) {
        throw new Error('Product not found');
      }

      // Obtener información relacionada
      const [category, seller, images, priceHistory] = await Promise.all([
        this.categoryRepository.findById(product.categoryId),
        this.sellerRepository.findById(product.sellerId),
        this.imageRepository.findBy({ productId: Number(productId) }),
        this.priceHistoryRepository.findBy({ productId: Number(productId) })
      ]);

      // Ordenar imágenes por orden
      images.sort((a, b) => a.order - b.order);

      // Ordenar historial de precios por fecha (más reciente primero)
      priceHistory.sort((a, b) => new Date(b.date) - new Date(a.date));

      return {
        ...product,
        category,
        seller,
        images,
        priceHistory,
        currentPrice: priceHistory.find(p => p.type === 'current')?.price || product.price
      };
    } catch (error) {
      console.error('Error getting product with details:', error);
      throw error;
    }
  }

  /**
   * Obtiene productos por categoría
   */
  async getProductsByCategory(categoryId) {
    try {
      const products = await this.productRepository.findBy({ categoryId });
      
      // Obtener información adicional para cada producto
      const productsWithDetails = await Promise.all(
        products.map(async (product) => {
          const [images, priceHistory] = await Promise.all([
            this.imageRepository.findBy({ productId: product.id }),
            this.priceHistoryRepository.findBy({ productId: product.id })
          ]);

          const currentPrice = priceHistory
            .filter(p => p.type === 'current')
            .sort((a, b) => new Date(b.date) - new Date(a.date))[0]?.price || product.price;

          return {
            ...product,
            mainImage: images.find(img => img.isMain) || images[0],
            currentPrice
          };
        })
      );

      return productsWithDetails;
    } catch (error) {
      console.error('Error getting products by category:', error);
      throw error;
    }
  }

  /**
   * Obtiene productos por vendedor
   */
  async getProductsBySeller(sellerId) {
    try {
      const products = await this.productRepository.findBy({ sellerId });
      
      const productsWithDetails = await Promise.all(
        products.map(async (product) => {
          const [images, priceHistory] = await Promise.all([
            this.imageRepository.findBy({ productId: product.id }),
            this.priceHistoryRepository.findBy({ productId: product.id })
          ]);

          const currentPrice = priceHistory
            .filter(p => p.type === 'current')
            .sort((a, b) => new Date(b.date) - new Date(a.date))[0]?.price || product.price;

          return {
            ...product,
            mainImage: images.find(img => img.isMain) || images[0],
            currentPrice
          };
        })
      );

      return productsWithDetails;
    } catch (error) {
      console.error('Error getting products by seller:', error);
      throw error;
    }
  }

  /**
   * Actualiza el precio de un producto y guarda el historial
   */
  async updateProductPrice(productId, newPrice) {
    try {
      // Actualizar precio actual en el producto
      await this.productRepository.update(productId, { price: newPrice });

      // Marcar precio anterior como histórico
      const currentPrices = await this.priceHistoryRepository.findBy({ 
        productId: Number(productId), 
        type: 'current' 
      });
      
      for (const price of currentPrices) {
        await this.priceHistoryRepository.update(price.id, { type: 'historical' });
      }

      // Crear nuevo registro de precio actual
      await this.priceHistoryRepository.create({
        productId: Number(productId),
        price: newPrice,
        currency: 'ARS',
        date: new Date().toISOString(),
        type: 'current'
      });

      return await this.getProductWithDetails(productId);
    } catch (error) {
      console.error('Error updating product price:', error);
      throw error;
    }
  }

  /**
   * Busca productos con filtros avanzados
   */
  async searchProducts(filters = {}) {
    try {
      let products = await this.productRepository.findAll();

      // Aplicar filtros
      if (filters.categoryId) {
        products = products.filter(p => p.categoryId === filters.categoryId);
      }

      if (filters.sellerId) {
        products = products.filter(p => p.sellerId === filters.sellerId);
      }

      if (filters.brand) {
        products = products.filter(p => p.brand === filters.brand);
      }

      if (filters.minPrice || filters.maxPrice) {
        products = products.filter(p => {
          if (filters.minPrice && p.price < filters.minPrice) return false;
          if (filters.maxPrice && p.price > filters.maxPrice) return false;
          return true;
        });
      }

      if (filters.condition) {
        products = products.filter(p => p.condition === filters.condition);
      }

      // Ordenar resultados
      if (filters.sortBy) {
        products.sort((a, b) => {
          switch (filters.sortBy) {
            case 'price_asc':
              return a.price - b.price;
            case 'price_desc':
              return b.price - a.price;
            case 'name_asc':
              return a.title.localeCompare(b.title);
            case 'name_desc':
              return b.title.localeCompare(a.title);
            default:
              return 0;
          }
        });
      }

      return products;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  }
} 