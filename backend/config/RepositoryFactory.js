import { JsonRepository } from '../repositories/JsonRepository.js';
import { DatabaseRepository } from '../repositories/DatabaseRepository.js';

/**
 * Factory para crear repositorios
 * Permite cambiar fácilmente entre JSON y base de datos
 */
export class RepositoryFactory {
  constructor() {
    this.dataSource = process.env.DATA_SOURCE || 'json'; // 'json' o 'database'
    this.dbConnection = null;
  }

  /**
   * Configura la conexión a la base de datos (opcional)
   */
  setDatabaseConnection(connection) {
    this.dbConnection = connection;
  }

  /**
   * Cambia la fuente de datos
   */
  setDataSource(dataSource) {
    this.dataSource = dataSource;
  }

  /**
   * Crea un repositorio según la configuración
   */
  createRepository(type) {
    if (this.dataSource === 'json') {
      return this.createJsonRepository(type);
    } else if (this.dataSource === 'database') {
      return this.createDatabaseRepository(type);
    } else {
      throw new Error(`Unsupported data source: ${this.dataSource}`);
    }
  }

  /**
   * Crea un repositorio JSON
   */
  createJsonRepository(type) {
    const fileMap = {
      products: 'products.json',
      categories: 'categories.json',
      sellers: 'sellers.json',
      images: 'images.json',
      priceHistory: 'price_history.json',
      reviews: 'reviews.json',
      availability: 'availability.json',
      payment: 'payment.json'
    };

    const filename = fileMap[type];
    if (!filename) {
      throw new Error(`Unknown repository type: ${type}`);
    }

    return new JsonRepository(filename);
  }

  /**
   * Crea un repositorio de base de datos
   */
  createDatabaseRepository(type) {
    if (!this.dbConnection) {
      throw new Error('Database connection not configured');
    }

    const tableMap = {
      products: 'products',
      categories: 'categories',
      sellers: 'sellers',
      images: 'images',
      priceHistory: 'price_history',
      reviews: 'reviews',
      availability: 'availability',
      payment: 'payment'
    };

    const tableName = tableMap[type];
    if (!tableName) {
      throw new Error(`Unknown repository type: ${type}`);
    }

    return new DatabaseRepository(tableName, this.dbConnection);
  }

  /**
   * Crea todos los repositorios necesarios
   */
  createAllRepositories() {
    const types = ['products', 'categories', 'sellers', 'images', 'priceHistory', 'reviews', 'availability', 'payment'];
    
    const repositories = {};
    types.forEach(type => {
      repositories[type] = this.createRepository(type);
    });

    return repositories;
  }
}

// Instancia global del factory
export const repositoryFactory = new RepositoryFactory(); 