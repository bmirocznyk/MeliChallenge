/**
 * Interfaz base para repositorios
 * Define los métodos que deben implementar todos los repositorios
 */
export class IRepository {
  async findById(id) {
    throw new Error('Method findById must be implemented');
  }

  async findAll() {
    throw new Error('Method findAll must be implemented');
  }

  async findBy(filters) {
    throw new Error('Method findBy must be implemented');
  }

  async create(data) {
    throw new Error('Method create must be implemented');
  }

  async update(id, data) {
    throw new Error('Method update must be implemented');
  }

  async delete(id) {
    throw new Error('Method delete must be implemented');
  }
} 