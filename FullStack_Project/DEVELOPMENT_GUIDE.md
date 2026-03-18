# Backend MVC Architecture - Quick Reference Guide

## How to Add a New Feature

### Example: Adding a "Ratings" Feature

#### Step 1: Update DTO (src/dto/RatingDTO.js)
```javascript
class RatingDTO {
  static validate(data) {
    const errors = [];
    if (!data.orderId) errors.push('orderId is required');
    if (!data.rating || rating < 1 || rating > 5) errors.push('rating must be 1-5');
    return errors;
  }
  
  static toJSON(rating) {
    return {
      id: rating.id,
      orderId: rating.orderId,
      rating: rating.rating,
      review: rating.review
    };
  }
}
```

#### Step 2: Create Repository (src/repositories/RatingRepository.js)
```javascript
class RatingRepository {
  getAllRatings() { return mockRatings; }
  getRatingById(id) { return mockRatings.find(r => r.id === id); }
  createRating(data) { 
    const newRating = { id: generateId(), ...data };
    mockRatings.push(newRating);
    return newRating;
  }
}
```

#### Step 3: Create Service (src/services/RatingService.js)
```javascript
class RatingService {
  createRating(data) {
    const errors = RatingDTO.validate(data);
    if (errors.length > 0) throw new Error(errors.join(', '));
    return RatingRepository.createRating(data);
  }
}
```

#### Step 4: Create Controller (src/controllers/RatingController.js)
```javascript
class RatingController {
  async createRating(req, res) {
    try {
      const rating = RatingService.createRating(req.body);
      res.status(201).json({ success: true, data: rating });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  }
}
```

#### Step 5: Add Routes (src/routes/ratingRoutes.js)
```javascript
router.post('/', RatingController.createRating);
router.get('/:id', RatingController.getRatingById);
```

#### Step 6: Register Routes (server.js)
```javascript
const ratingRoutes = require('./src/routes/ratingRoutes');
app.use('/api/ratings', ratingRoutes);
```

---

## Layer Responsibilities

### DTO Layer
```
✓ Validate input data
✓ Transform data for responses
✓ Define data structure
✓ Check required fields
✓ Type checking
```

### Repository Layer
```
✓ CRUD operations
✓ Data access from storage
✓ Query building
✓ Data filtering/searching
✓ No business logic
```

### Service Layer
```
✓ Business logic
✓ Validation (via DTO)
✓ Calculations
✓ Data transformation
✓ Call repositories
✓ Error handling
```

### Controller Layer
```
✓ Handle HTTP requests
✓ Call services
✓ Format HTTP responses
✓ Error handling
✓ Status codes
✓ No business logic
```

### Route Layer
```
✓ Map URLs to controllers
✓ HTTP method mapping
✓ Endpoint definitions
✓ No logic
```

---

## Common Patterns

### Reading Data
```
Client Request
    ↓
Router (/api/restaurants)
    ↓
Controller.getAllRestaurants()
    ↓
Service.getAllRestaurants()
    ↓
Repository.getAllRestaurants()
    ↓
mockDatabase (returns array)
    ↓
Service (formats with DTO.toJSON())
    ↓
Controller (sends response)
    ↓
Client Response
```

### Creating Data
```
Client POST /api/orders {data}
    ↓
Router catches POST
    ↓
Controller.createOrder(req.body)
    ↓
Service.createOrder(data)
    - DTO.validate(data)
    - Perform business logic
    - Call Repository
    ↓
Repository.createOrder(data)
    - Add to mockOrders
    - Return with ID
    ↓
Service returns formatted data
    ↓
Controller sends 201 response
    ↓
Client receives created order
```

### Updating Data
```
Client PUT /api/orders/123/status {status: 'delivered'}
    ↓
Controller.updateOrderStatus(req.params.id, req.body.status)
    ↓
Service.updateOrderStatus(id, status)
    - Validate status
    - Call Repository
    ↓
Repository.updateOrderStatus(id, status)
    - Find order
    - Update status
    - Return updated order
    ↓
Response sent back
```

---

## Testing Each Layer

### Test DTO
```javascript
test('RestaurantDTO.validate() - valid data', () => {
  const data = { name: 'Pizza', rating: 4.5 };
  const errors = RestaurantDTO.validate(data);
  expect(errors.length).toBe(0);
});

test('RestaurantDTO.validate() - missing name', () => {
  const data = { rating: 4.5 };
  const errors = RestaurantDTO.validate(data);
  expect(errors.length).toBeGreaterThan(0);
});
```

### Test Repository
```javascript
test('RestaurantRepository.getRestaurantById()', () => {
  const restaurant = RestaurantRepository.getRestaurantById(1);
  expect(restaurant.name).toBe('Pizza Palace');
});
```

### Test Service
```javascript
test('RestaurantService.getRestaurantById() - not found', () => {
  expect(() => {
    RestaurantService.getRestaurantById(999);
  }).toThrow('Restaurant not found');
});
```

### Test Controller
```javascript
test('RestaurantController.getAllRestaurants', async () => {
  const req = {};
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  };
  
  await RestaurantController.getAllRestaurants(req, res);
  
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalled();
});
```

---

## Debug Tips

### 1. Check Request Flow
```bash
# Check what hits the server
# Look at console logs in terminal

2024-01-15T10:30:45.123Z - GET /api/restaurants
2024-01-15T10:30:45.125Z - GET /api/restaurants/1
```

### 2. Add Debug Logs
```javascript
// In Service
console.log('Input data:', data);
console.log('After validation:', validatedData);
console.log('Before DB call:', preparedData);
console.log('Result:', result);
```

### 3. Test Endpoint with curl
```bash
# Get all restaurants
curl http://localhost:5000/api/restaurants

# Get restaurant by ID
curl http://localhost:5000/api/restaurants/1

# Create order
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{"restaurant_id": 1, "items": []}'
```

### 4. Check Data Flow
```
Frontend calls: axios.get('/api/restaurants')
    ↓
Backend receives: GET /api/restaurants
    ↓
Routes forward to: RestaurantController.getAllRestaurants()
    ↓
Controller calls: RestaurantService.getAllRestaurants()
    ↓
Service gets from: RestaurantRepository.getAllRestaurants()
    ↓
Repository returns: mockRestaurants array
    ↓
Service formats with: RestaurantDTO.toJSON()
    ↓
Controller responds: res.json({ success: true, data: [] })
    ↓
Frontend receives: JavaScript array
```

---

## Error Handling Checklist

When adding a new endpoint:

- [ ] Validate all input in DTO
- [ ] Check if resource exists
- [ ] Handle errors in service
- [ ] Return proper HTTP status codes
- [ ] Provide error messages
- [ ] Log errors for debugging

```javascript
async getAllRestaurants(req, res) {
  try {
    const restaurants = RestaurantService.getAllRestaurants();
    res.status(200).json({
      success: true,
      data: restaurants,
      count: restaurants.length
    });
  } catch (error) {
    console.error('Error in getAllRestaurants:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
```

---

## HTTP Status Codes Reference

```
200 OK              - Request succeeded
201 Created         - Resource created successfully
204 No Content      - Success with no response body
400 Bad Request     - Invalid input data
401 Unauthorized    - Authentication required
403 Forbidden       - Permission denied
404 Not Found       - Resource doesn't exist
409 Conflict        - Resource already exists
422 Unprocessable   - Validation failed
500 Server Error    - Unexpected error
503 Unavailable     - Server temporarily down
```

---

## Response Format Standard

All API responses should follow this format:

### Success Response
```javascript
{
  success: true,
  data: { /* actual data */ },
  count: 10,  // optional, for lists
  message: "Operation successful"  // optional
}
```

### Error Response
```javascript
{
  success: false,
  error: "Validation errors",
  errors: [  // optional, for detailed errors
    "Email is required",
    "Price must be positive"
  ]
}
```

---

## File Naming Conventions

```
✓ RestaurantDTO.js          (DTO files)
✓ RestaurantRepository.js   (Repository files)
✓ RestaurantService.js      (Service files)
✓ RestaurantController.js   (Controller files)
✓ restaurantRoutes.js       (Route files - lowercase)
✓ mockDatabase.js           (Data files)
```

---

## Tips for Production

1. **Add Input Sanitization**
   - Sanitize strings to prevent XSS
   - Validate and escape all inputs

2. **Add Authentication**
   - JWT tokens
   - User permissions in middleware

3. **Add Logging**
   - Winston or similar
   - Log all requests and errors

4. **Add Caching**
   - Redis for frequently accessed data
   - Cache restaurants list

5. **Add Rate Limiting**
   - Prevent abuse
   - Limit requests per IP/user

6. **Add API Documentation**
   - Swagger/OpenAPI
   - Document all endpoints

7. **Add Database**
   - Replace mock data
   - Use transactions
   - Add indexes

8. **Add Unit Tests**
   - Jest for testing
   - Aim for >80% coverage

---

**Remember**: Layers should be independent and testable!
