import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { IRepository } from '../interfaces/IRepository.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Repositorio para trabajar con archivos JSON
 * Implementa la interfaz IRepository
 */
export class JsonRepository extends IRepository {
  constructor(filename) {
    super();
    this.filename = filename;
    this.filePath = join(__dirname, '..', filename);
  }

  /**
   * Lee el archivo JSON y retorna los datos
   */
  async readData() {
    try {
      const data = fs.readFileSync(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error(`Error reading ${this.filename}:`, error);
      return [];
    }
  }

  /**
   * Escribe datos al archivo JSON
   */
  async writeData(data) {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
      return true;
    } catch (error) {
      console.error(`Error writing ${this.filename}:`, error);
      return false;
    }
  }

  /**
   * Busca un elemento por ID
   */
  async findById(id) {
    const data = await this.readData();
    return data.find(item => item.id === id || item.id === Number(id));
  }

  /**
   * Retorna todos los elementos
   */
  async findAll() {
    return await this.readData();
  }

  /**
   * Busca elementos por filtros
   */
  async findBy(filters) {
    const data = await this.readData();
    return data.filter(item => {
      return Object.keys(filters).every(key => {
        if (Array.isArray(filters[key])) {
          return filters[key].includes(item[key]);
        }
        return item[key] === filters[key];
      });
    });
  }

  /**
   * Crea un nuevo elemento
   */
  async create(data) {
    const items = await this.readData();
    const newItem = {
      id: this.generateId(items),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    items.push(newItem);
    await this.writeData(items);
    return newItem;
  }

  /**
   * Actualiza un elemento existente
   */
  async update(id, data) {
    const items = await this.readData();
    const index = items.findIndex(item => item.id === id || item.id === Number(id));
    
    if (index === -1) {
      throw new Error('Item not found');
    }

    items[index] = {
      ...items[index],
      ...data,
      updatedAt: new Date().toISOString()
    };

    await this.writeData(items);
    return items[index];
  }

  /**
   * Elimina un elemento
   */
  async delete(id) {
    const items = await this.readData();
    const filteredItems = items.filter(item => item.id !== id && item.id !== Number(id));
    
    if (filteredItems.length === items.length) {
      throw new Error('Item not found');
    }

    await this.writeData(filteredItems);
    return true;
  }

  /**
   * Genera un ID único
   */
  generateId(items) {
    if (items.length === 0) return 1;
    const maxId = Math.max(...items.map(item => item.id));
    return maxId + 1;
  }
} 