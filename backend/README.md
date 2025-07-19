# MercadoLibre Backend API

A clean, scalable backend API built with Express.js and TypeScript using hexagonal architecture.

## 🏗️ Architecture

This backend follows **Hexagonal Architecture** (Ports and Adapters) principles:

```
┌─────────────────────────────────────────────────────────────┐
│                    Interfaces Layer                         │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │   Controllers   │  │     Routes      │  │   Middleware │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                   Application Layer                         │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │   Use Cases     │  │    Services     │  │   DTOs       │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                    Domain Layer                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │    Entities     │  │   Repositories  │  │   Business   │ │
│  │                 │  │   (Interfaces)  │  │   Rules      │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                 Infrastructure Layer                        │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │  Repositories   │  │    Database     │  │   External   │ │
│  │  (Implement.)   │  │   (JSON/DB)     │  │   Services   │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Features

- ✅ **Hexagonal Architecture** - Clean separation of concerns
- ✅ **TypeScript** - Full type safety
- ✅ **Express.js** - Fast and reliable web framework
- ✅ **JSON Data Source** - Easy to switch to database later
- ✅ **CORS Support** - Frontend integration ready
- ✅ **Security Headers** - Helmet.js protection
- ✅ **Logging** - Morgan HTTP request logger
- ✅ **Error Handling** - Comprehensive error management

## 📦 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/search?q=query` - Search products

### Health & Info
- `GET /api/health` - Health check
- `GET /` - API information

## 🛠️ Installation

```bash
# Install dependencies
npm install

# Development
npm run dev

# Production build
npm run build
npm start

# Linting
npm run lint
```

## 🔧 Configuration

### Environment Variables
```env
PORT=4000
NODE_ENV=development
```

### CORS Origins
The API is configured to accept requests from:
- `http://localhost:5173` (Vite dev server)
- `http://localhost:3000` (Alternative dev server)
- `http://127.0.0.1:5173` (Localhost alternative)

## 📁 Project Structure

```
src/
├── domain/                    # Business logic
│   ├── entities/             # Domain entities
│   └── repositories/         # Repository interfaces
├── application/              # Application services
│   ├── use-cases/           # Business use cases
│   └── services/            # Application services
├── infrastructure/           # External concerns
│   ├── repositories/        # Repository implementations
│   └── database/            # Data sources
├── interfaces/               # Web layer
│   ├── controllers/         # HTTP controllers
│   └── routes/              # Express routes
├── shared/                   # Shared utilities
│   ├── types/               # TypeScript types
│   └── utils/               # Utility functions
└── server.ts                # Application entry point
```

## 🔄 Database Migration

Currently using JSON files, but designed for easy database migration:

1. **Create new repository implementation** in `infrastructure/repositories/`
2. **Implement the same interface** as `JsonProductRepository`
3. **Update dependency injection** in `server.ts`
4. **No changes needed** in domain or application layers

## 🧪 Testing

```bash
# Run tests
npm test

# Test coverage
npm run test:coverage
```

## 📊 Data Models

### Product
- **SellerInfo** - Seller details and reputation
- **ProductInfo** - Product specifications and details
- **ProductRating** - Reviews and ratings
- **ProductImages** - Image gallery with metadata

### Example Response
```json
{
  "id": 1,
  "title": "iPhone 15 Pro Max 256GB Titanio Natural",
  "price": 1500000,
  "currency": "ARS",
  "seller": {
    "id": 1,
    "name": "Apple Store Argentina",
    "reputation": 4.9,
    "verified": true
  },
  "images": [...],
  "reviews": [...],
  "attributes": [...],
  "variants": [...]
}
```

## 🔒 Security

- **Helmet.js** - Security headers
- **CORS** - Cross-origin resource sharing
- **Input validation** - Request parameter validation
- **Error handling** - No sensitive data in error responses

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm start
```

### Docker (Future)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 4000
CMD ["npm", "start"]
```

## 🔄 Future Enhancements

- [ ] **Database Integration** - MongoDB/PostgreSQL
- [ ] **Authentication** - JWT tokens
- [ ] **Caching** - Redis integration
- [ ] **Rate Limiting** - API throttling
- [ ] **Validation** - Joi/Zod schemas
- [ ] **Documentation** - Swagger/OpenAPI
- [ ] **Testing** - Unit and integration tests
- [ ] **Monitoring** - Health checks and metrics

## 📝 License

This project is for educational purposes. 