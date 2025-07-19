# Backend Architecture - Repository Pattern

## 🏗️ Arquitectura Orientada a Interfaces

Este backend implementa el **patrón Repository** con interfaces que permiten cambiar fácilmente entre diferentes fuentes de datos (JSON, Database, API, etc.) sin afectar el resto de la aplicación.

## 📁 Estructura de Archivos

```
backend/
├── interfaces/
│   └── IRepository.js          # Interfaz base para repositorios
├── repositories/
│   ├── JsonRepository.js       # Implementación para archivos JSON
│   └── DatabaseRepository.js   # Implementación para bases de datos
├── services/
│   └── ProductService.js       # Lógica de negocio
├── config/
│   └── RepositoryFactory.js    # Factory para crear repositorios
├── *.json                      # Archivos de datos JSON
└── server.js                   # Servidor Express
```

## 🔄 Patrón Repository

### 1. **Interfaz Base (IRepository)**
```javascript
// interfaces/IRepository.js
export class IRepository {
  async findById(id) { /* ... */ }
  async findAll() { /* ... */ }
  async findBy(filters) { /* ... */ }
  async create(data) { /* ... */ }
  async update(id, data) { /* ... */ }
  async delete(id) { /* ... */ }
}
```

### 2. **Implementaciones**
- **JsonRepository**: Lee/escribe archivos JSON
- **DatabaseRepository**: Ejecuta queries SQL

### 3. **Factory Pattern**
```javascript
// config/RepositoryFactory.js
const factory = new RepositoryFactory();
const productRepo = factory.createRepository('products');
```

## 🚀 Cómo Usar

### **Configuración Actual (JSON)**
```bash
# Variable de entorno (opcional, por defecto es 'json')
DATA_SOURCE=json
```

### **Cambiar a Database**
```bash
# 1. Cambiar variable de entorno
DATA_SOURCE=database

# 2. Configurar conexión en el factory
import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('./database.sqlite');
repositoryFactory.setDatabaseConnection(db);
```

### **Uso en el Servidor**
```javascript
// server.js
const repositories = repositoryFactory.createAllRepositories();
const productService = new ProductService(
  repositories.products,
  repositories.categories,
  // ... otros repositorios
);
```

## 📊 Endpoints Disponibles

### **Productos**
- `GET /api/products/:id` - Información básica del producto
- `GET /api/products/:id/complete` - Producto con todas las relaciones
- `POST /api/products/:id/price` - Actualizar precio

### **Categorías**
- `GET /api/categories/:id` - Información de categoría
- `GET /api/categories/:id/products` - Productos por categoría

### **Vendedores**
- `GET /api/sellers/:id` - Información del vendedor
- `GET /api/sellers/:id/products` - Productos del vendedor

### **Datos Relacionados**
- `GET /api/images/:productId` - Imágenes del producto
- `GET /api/price-history/:productId` - Historial de precios
- `GET /api/reviews/:productId` - Reseñas y calificaciones
- `GET /api/availability/:productId` - Disponibilidad y envío
- `GET /api/payment/:productId` - Información de pago

### **Búsqueda**
- `GET /api/search/products` - Búsqueda con filtros

### **Legacy**
- `GET /api/items/:id` - Endpoint legacy (compatibilidad)

## 🔧 Agregar Nueva Fuente de Datos

### 1. **Crear Nueva Implementación**
```javascript
// repositories/ApiRepository.js
export class ApiRepository extends IRepository {
  constructor(baseUrl, apiKey) {
    super();
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  async findById(id) {
    const response = await fetch(`${this.baseUrl}/products/${id}`, {
      headers: { 'Authorization': `Bearer ${this.apiKey}` }
    });
    return response.json();
  }
  // ... implementar otros métodos
}
```

### 2. **Actualizar Factory**
```javascript
// config/RepositoryFactory.js
createRepository(type) {
  if (this.dataSource === 'api') {
    return new ApiRepository(this.apiUrl, this.apiKey);
  }
  // ... otros casos
}
```

### 3. **Configurar**
```bash
DATA_SOURCE=api
API_URL=https://api.example.com
API_KEY=your_api_key
```

## 🎯 Beneficios

### **✅ Separación de Responsabilidades**
- **API Layer**: Solo maneja HTTP
- **Service Layer**: Lógica de negocio
- **Repository Layer**: Acceso a datos abstracto
- **Data Source**: Implementación específica

### **✅ Flexibilidad**
- Cambiar fuente de datos sin tocar código
- Agregar nuevas fuentes fácilmente
- Testing simplificado con mocks

### **✅ Escalabilidad**
- Fácil agregar nuevos repositorios
- Fácil agregar nuevos servicios
- Arquitectura preparada para crecimiento

### **✅ Mantenibilidad**
- Código limpio y organizado
- Fácil de entender y modificar
- Patrones estándar de la industria

## 🧪 Testing

### **Mock Repository**
```javascript
class MockRepository extends IRepository {
  constructor(data = []) {
    super();
    this.data = data;
  }

  async findById(id) {
    return this.data.find(item => item.id === id);
  }
  // ... implementar otros métodos
}

// Uso en tests
const mockRepo = new MockRepository([{ id: 1, name: 'Test' }]);
const service = new ProductService(mockRepo, ...);
```

## 📈 Próximos Pasos

1. **Implementar DatabaseRepository** con SQLite/PostgreSQL
2. **Agregar cache** con Redis
3. **Implementar paginación** en repositorios
4. **Agregar validación** de datos
5. **Implementar logging** centralizado
6. **Agregar tests** unitarios e integración

## 🔗 Ejemplos de Uso

### **Buscar Productos**
```bash
# Por categoría
GET /api/categories/1/products

# Por vendedor
GET /api/sellers/1/products

# Con filtros
GET /api/search/products?brand=Apple&minPrice=1000000&sortBy=price_asc
```

### **Actualizar Precio**
```bash
POST /api/products/1/price
Content-Type: application/json

{
  "price": 1600000
}
```

Esta arquitectura te permite mantener la funcionalidad JSON actual mientras preparas tu aplicación para escalar a una base de datos real en el futuro. ¡Es una base sólida y profesional! 