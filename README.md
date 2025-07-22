# MercadoLibre Challenge

This project implements a MercadoLibre-like product page with seller information separation.

## 🚀 Architecture Updates

### Seller Data Separation

The seller information has been isolated from products into a separate data source:

#### Data Sources:
- **Products**: `backend/src/infrastructure/database/products.json`
  - Now contains `sellerId` references instead of full seller objects
- **Sellers**: `backend/src/infrastructure/database/sellers.json` *(NEW)*
  - Contains all seller information normalized by ID
- **Payment Methods**: `backend/src/infrastructure/database/payment-methods.json`
- **Comments**: `backend/src/infrastructure/database/comments.json`

#### Backend Architecture:
- **Repository Pattern**: `SellerRepository` interface with `JsonSellerRepository` implementation
- **Use Cases**: `GetSellerUseCase` for seller data operations
- **Controllers**: Extended `ProductController` with seller endpoints

## 📡 API Endpoints

### Product Endpoints
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/:id/comments` - Get product comments
- `GET /api/products/:id/with-payment-methods` - Get product with payment methods
- `GET /api/products/search?q=query` - Search products

### Seller Endpoints *(NEW)*
- `GET /api/sellers` - Get all sellers
- `GET /api/sellers/:id` - Get seller by ID
- `GET /api/sellers/by-ids?ids=1,2,3` - Get sellers by IDs
- `GET /api/sellers/verified` - Get verified sellers only

### Payment Method Endpoints
- `GET /api/payment-methods` - Get all payment methods
- `GET /api/payment-methods/by-ids?ids=pm_001,pm_002` - Get payment methods by IDs

## 🔧 Frontend Updates

### API Service
- Added seller fetching methods in `src/services/api.ts`
- New `getProductWithSellerAndPaymentMethods()` method for complete data

### Type Definitions
- Updated `Product` interface to use `sellerId` instead of `seller` object
- Added optional `seller?` property for when seller data is populated

## 🎯 Benefits of Seller Separation

1. **Data Normalization**: Eliminates duplicate seller information across products
2. **Better Performance**: Sellers can be cached separately and fetched on demand
3. **Easier Maintenance**: Single source of truth for seller information
4. **Scalability**: Supports independent seller and product updates
5. **API Flexibility**: Clients can choose whether to fetch seller data or not

## 🛠 Development

```bash
# Start backend
cd backend
npm install
npm run dev

# Start frontend  
npm install
npm run dev
```

The seller separation maintains backward compatibility while providing a more scalable architecture for future enhancements. 