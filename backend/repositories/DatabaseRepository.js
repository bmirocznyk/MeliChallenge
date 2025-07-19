import { IRepository } from '../interfaces/IRepository.js';

/**
 * Repositorio para trabajar con bases de datos reales
 * Implementa la interfaz IRepository
 * 
 * Ejemplo de uso con SQLite:
 * const db = new sqlite3.Database('./database.sqlite');
 * const productRepo = new DatabaseRepository('products', db);
 */
export class DatabaseRepository extends IRepository {
  constructor(tableName, dbConnection) {
    super();
    this.tableName = tableName;
    this.db = dbConnection;
  }

  /**
   * Busca un elemento por ID
   */
  async findById(id) {
    try {
      const query = `SELECT * FROM ${this.tableName} WHERE id = ?`;
      const result = await this.db.get(query, [id]);
      return result;
    } catch (error) {
      console.error(`Error finding ${this.tableName} by id:`, error);
      throw error;
    }
  }

  /**
   * Retorna todos los elementos
   */
  async findAll() {
    try {
      const query = `SELECT * FROM ${this.tableName}`;
      const result = await this.db.all(query);
      return result;
    } catch (error) {
      console.error(`Error finding all ${this.tableName}:`, error);
      throw error;
    }
  }

  /**
   * Busca elementos por filtros
   */
  async findBy(filters) {
    try {
      const conditions = Object.keys(filters).map(key => `${key} = ?`).join(' AND ');
      const values = Object.values(filters);
      const query = `SELECT * FROM ${this.tableName} WHERE ${conditions}`;
      const result = await this.db.all(query, values);
      return result;
    } catch (error) {
      console.error(`Error finding ${this.tableName} by filters:`, error);
      throw error;
    }
  }

  /**
   * Crea un nuevo elemento
   */
  async create(data) {
    try {
      const columns = Object.keys(data).join(', ');
      const placeholders = Object.keys(data).map(() => '?').join(', ');
      const values = Object.values(data);
      
      const query = `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders})`;
      const result = await this.db.run(query, values);
      
      return {
        id: result.lastID,
        ...data
      };
    } catch (error) {
      console.error(`Error creating ${this.tableName}:`, error);
      throw error;
    }
  }

  /**
   * Actualiza un elemento existente
   */
  async update(id, data) {
    try {
      const setClause = Object.keys(data).map(key => `${key} = ?`).join(', ');
      const values = [...Object.values(data), id];
      
      const query = `UPDATE ${this.tableName} SET ${setClause} WHERE id = ?`;
      const result = await this.db.run(query, values);
      
      if (result.changes === 0) {
        throw new Error('Item not found');
      }
      
      return await this.findById(id);
    } catch (error) {
      console.error(`Error updating ${this.tableName}:`, error);
      throw error;
    }
  }

  /**
   * Elimina un elemento
   */
  async delete(id) {
    try {
      const query = `DELETE FROM ${this.tableName} WHERE id = ?`;
      const result = await this.db.run(query, [id]);
      
      if (result.changes === 0) {
        throw new Error('Item not found');
      }
      
      return true;
    } catch (error) {
      console.error(`Error deleting ${this.tableName}:`, error);
      throw error;
    }
  }

  /**
   * Ejecuta una consulta personalizada
   */
  async executeQuery(query, params = []) {
    try {
      const result = await this.db.all(query, params);
      return result;
    } catch (error) {
      console.error(`Error executing query on ${this.tableName}:`, error);
      throw error;
    }
  }
} 