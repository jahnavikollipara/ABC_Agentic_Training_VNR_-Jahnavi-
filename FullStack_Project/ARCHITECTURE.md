# Food Delivery App - MVC Architecture

## Overview
The backend has been refactored from a monolithic structure to a professional **Model-View-Controller (MVC)** architecture with proper separation of concerns.

## Architecture Layers

### 1. **DTOs (Data Transfer Objects)** - `src/dto/`
- **Purpose**: Define data structure and validation rules
- **Files**:
  - `RestaurantDTO.js` - Validates and serializes restaurant data
  - `OrderDTO.js` - Validates and serializes order data

```
RestaurantDTO.toJSON()     → Format restaurant for response
RestaurantDTO.validate()   → Validate incoming restaurant data
```

### 2. **Repositories** - `src/repositories/`
- **Purpose**: Abstract data access layer, handle CRUD operations
- **Files**:
  - `RestaurantRepository.js` - All restaurant data access
  - `OrderRepository.js` - All order data access

```
RestaurantRepository.getRestaurantById()  → Query by ID
RestaurantRepository.searchRestaurants()  → Search functionality
OrderRepository.createOrder()             → Add new order
OrderRepository.updateOrderStatus()       → Update status
```

### 3. **Services** - `src/services/`
- **Purpose**: Business logic, validation, calculations
- **Files**:
  - `RestaurantService.js` - Restaurant business logic
  - `OrderService.js` - Order business logic

```
RestaurantService.getRestaurantById()        → Get with validation
OrderService.createOrder()                   → Create with calculations
OrderService.calculateDeliveryCharge()       → Business calculation
OrderService.applyPromoCode()                → Promo logic
```

### 4. **Controllers** - `src/controllers/`
- **Purpose**: Handle HTTP requests/responses, orchestrate services
- **Files**:
  - `RestaurantController.js` - Restaurant HTTP handlers
  - `OrderController.js` - Order HTTP handlers

```
RestaurantController.getAllRestaurants(req, res)   → HTTP GET handler
OrderController.createOrder(req, res)              → HTTP POST handler
```

### 5. **Routes** - `src/routes/`
- **Purpose**: Define API endpoints, map to controllers
- **Files**:
  - `restaurantRoutes.js` - Restaurant API routes
  - `orderRoutes.js` - Order API routes

```
GET  /api/restaurants              → List all restaurants
POST /api/orders                   → Create new order
PUT  /api/orders/:id/status        → Update order status
```

### 6. **Data Layer** - `src/data/`
- **Purpose**: Mock database (replaced with real DB later)
- **Files**:
  - `mockDatabase.js` - In-memory mock data

```
mockRestaurants    → Array of restaurant objects
mockOrders         → Array of order objects
```

## Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│  REQUEST: GET /api/restaurants                              │
└─────────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────────┐
│  ROUTES (restaurantRoutes.js)                               │
│  - Routes request to RestaurantController.getAllRestaurants │
└─────────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────────┐
│  CONTROLLER (RestaurantController)                          │
│  - Receives request                                          │
│  - Calls RestaurantService.getAllRestaurants()             │
│  - Formats response                                         │
└─────────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────────┐
│  SERVICE (RestaurantService)                                │
│  - Implements business logic                                │
│  - Calls RestaurantRepository.getAllRestaurants()          │
│  - Formats data with RestaurantDTO.toJSON()                │
└─────────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────────┐
│  REPOSITORY (RestaurantRepository)                          │
│  - Accesses mock data                                       │
│  - Returns raw restaurant objects                           │
└─────────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────────┐
│  DATA (mockDatabase.js)                                     │
│  - mockRestaurants array                                    │
└─────────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────────┐
│  RESPONSE: [{ id, name, rating, ... }]                      │
└─────────────────────────────────────────────────────────────┘
```

## API Endpoints

### Restaurants
```
GET    /api/restaurants                  - Get all restaurants
GET    /api/restaurants/:id              - Get restaurant by ID
GET    /api/restaurants/cuisines         - Get all cuisines
GET    /api/restaurants/search?query=    - Search restaurants
GET    /api/restaurants/:id/menu         - Get restaurant menu
GET    /api/restaurants/:id/summary      - Get restaurant summary
POST   /api/restaurants                  - Create restaurant (admin)
PUT    /api/restaurants/:id              - Update restaurant (admin)
DELETE /api/restaurants/:id              - Delete restaurant (admin)
```

### Orders
```
GET    /api/orders                       - Get all orders
GET    /api/orders/:id                   - Get order by ID
GET    /api/orders?email=                - Get customer orders
GET    /api/orders/history?email=        - Get order history
GET    /api/orders/:id/tracking          - Get tracking updates
POST   /api/orders                       - Create order
PUT    /api/orders/:id/status            - Update order status
PUT    /api/orders/:id/cancel            - Cancel order
POST   /api/orders/:id/promo             - Apply promo code
GET    /api/orders/stats                 - Get statistics
```

## File Structure

```
backend/
├── server.js                          # Entry point (clean & lean)
├── src/
│   ├── dto/
│   │   ├── RestaurantDTO.js          # Validation & serialization
│   │   └── OrderDTO.js               # Validation & serialization
│   ├── repositories/
│   │   ├── RestaurantRepository.js   # Data access for restaurants
│   │   └── OrderRepository.js        # Data access for orders
│   ├── services/
│   │   ├── RestaurantService.js      # Business logic for restaurants
│   │   └── OrderService.js           # Business logic for orders
│   ├── controllers/
│   │   ├── RestaurantController.js   # HTTP handlers for restaurants
│   │   └── OrderController.js        # HTTP handlers for orders
│   ├── routes/
│   │   ├── restaurantRoutes.js       # Restaurant API routes
│   │   └── orderRoutes.js            # Order API routes
│   └── data/
│       └── mockDatabase.js            # Mock in-memory database
├── package.json
├── .env
└── ARCHITECTURE.md                    # This file
```

## Key Benefits

### 1. **Separation of Concerns**
Each layer has a single responsibility:
- DTOs: Data structure & validation
- Repositories: Data access
- Services: Business logic
- Controllers: HTTP handling

### 2. **Maintainability**
- Easy to locate and modify code
- Changes in one layer don't affect others
- Clear data flow and responsibilities

### 3. **Testability**
- Each layer can be tested independently
- Mock repositories for testing services
- Mock services for testing controllers

### 4. **Scalability**
- Easy to add new features
- Can replace repository layer with real database
- Can add middleware for authentication/logging

### 5. **Reusability**
- Services can be reused by multiple controllers
- Repositories encapsulate data access logic
- DTOs ensure consistent data format

## Migration to Real Database

To switch from mock data to a real database (MongoDB/PostgreSQL):

1. **Update mockDatabase.js** → Use actual database client
2. **Modify Repositories** → Replace array operations with DB queries
3. **Services & Controllers** → No changes needed
4. **DTOs** → No changes needed
5. **Routes** → No changes needed

Example:
```javascript
// Before (mockDatabase.js)
const mockRestaurants = [{ id: 1, name: '...' }];

// After (with MongoDB)
const restaurants = db.collection('restaurants');
const mockRestaurants = await restaurants.find({}).toArray();
```

## Example: Creating an Order

```javascript
// 1. CLIENT REQUEST
POST /api/orders
{
  restaurant_id: 1,
  items: [{ item_id: 101, quantity: 2 }],
  customer: { name: "John", email: "john@example.com" }
}

// 2. ROUTES (orderRoutes.js)
router.post('/', OrderController.createOrder);

// 3. CONTROLLER (OrderController.js)
async createOrder(req, res) {
  const order = OrderService.createOrder(req.body);
  res.status(201).json(order);
}

// 4. SERVICE (OrderService.js)
createOrder(orderData) {
  // Validate data
  const errors = OrderDTO.validate(orderData);
  
  // Verify restaurant exists
  const restaurant = RestaurantRepository.getRestaurantById(orderData.restaurant_id);
  
  // Calculate prices
  const subtotal = calculateSubtotal(items);
  const tax = calculateTax(subtotal);
  const delivery = calculateDeliveryCharge(subtotal);
  
  // Create order through repository
  return OrderRepository.createOrder({
    ...orderData,
    subtotal,
    tax,
    delivery,
    total: subtotal + tax + delivery
  });
}

// 5. REPOSITORY (OrderRepository.js)
createOrder(orderData) {
  const newOrder = {
    id: incrementOrderIdCounter(),
    ...orderData,
    createdAt: new Date().toISOString()
  };
  mockOrders.push(newOrder);
  return newOrder;
}

// 6. RESPONSE
{
  success: true,
  data: {
    id: 1001,
    restaurant_id: 1,
    items: [...],
    subtotal: 500,
    tax: 25,
    delivery_charge: 30,
    total: 555,
    status: 'confirmed'
  }
}
```

## Best Practices Used

✅ **Single Responsibility Principle** - Each class/function has one job
✅ **Dependency Injection** - Services use repositories, not creating them
✅ **Error Handling** - Proper try-catch and error responses
✅ **Data Validation** - DTOs validate before processing
✅ **Consistent Response Format** - All responses follow same structure
✅ **Async/Await** - All controllers are async for future DB operations
✅ **Logging** - Request logging middleware for debugging
✅ **HTTP Status Codes** - Proper status codes (201 for created, 404 for not found)

## Next Steps (Optional Enhancements)

1. Add MongoDB integration
2. Add authentication & authorization
3. Add input validation middleware
4. Add error logging service
5. Add caching layer (Redis)
6. Add unit tests
7. Add API documentation (Swagger/OpenAPI)
8. Add rate limiting
9. Add request/response compression
10. Add database migrations

---
**Architecture Pattern**: MVC (Model-View-Controller) with Repository Pattern
**Status**: ✅ Complete and working with mock data
**Last Updated**: 2024
