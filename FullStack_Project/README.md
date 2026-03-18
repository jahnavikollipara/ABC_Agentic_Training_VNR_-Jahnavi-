# 🍕 FoodHub - Food Delivery App

A complete food delivery application like Zomato built with React (Frontend) and Node.js Express (Backend).

## Project Structure

```
food-delivery-app/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── styles/
    │   ├── api.js
    │   ├── App.js
    │   ├── index.js
    │   └── ...
    └── package.json
```

## Features

✅ **Browse Restaurants** - View list of all restaurants
✅ **Search** - Search for restaurants or food items
✅ **View Menu** - Browse restaurant menu with prices
✅ **Add to Cart** - Add items to shopping cart
✅ **Manage Cart** - Update quantities and remove items
✅ **Checkout** - Place orders with delivery address
✅ **Order Tracking** - Track order status in real-time
✅ **Order History** - View all past orders

## Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variables

### Frontend
- **React** - UI library
- **React Router** - Navigation and routing
- **Axios** - HTTP client
- **CSS3** - Styling

## Setup Instructions

### 1. Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file (already exists)
# PORT=5000

# Start the server
npm start
```

The backend will run on `http://localhost:5000`

### 2. Frontend Setup

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start React app
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Restaurants
- `GET /api/restaurants` - Get all restaurants
- `GET /api/restaurants/:id` - Get restaurant by ID
- `GET /api/restaurants/:id/items` - Get restaurant items
- `GET /api/search?q=query` - Search restaurants

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/status` - Update order status
- `DELETE /api/orders/:id` - Cancel order

## Usage

1. **Start Backend**
   ```bash
   cd backend
   npm start
   ```

2. **Start Frontend** (in new terminal)
   ```bash
   cd frontend
   npm start
   ```

3. **Access Application**
   - Open `http://localhost:3000` in your browser

4. **Use App**
   - Browse restaurants on home page
   - Click on restaurant to view menu
   - Add items to cart
   - Click "Cart" to review items
   - Click "Proceed to Checkout" to place order
   - View order status in real-time
   - Check order history anytime

## Sample Data

The app comes with sample restaurants and menu items:

1. **Pizza Palace** - Italian cuisine
2. **Burger Barn** - American cuisine
3. **Sushi Supreme** - Japanese cuisine

Each restaurant has sample menu items with prices.

## Features Explained

### Cart Management
- Add/remove items
- Update quantities
- View total price
- Clear cart after order

### Order Placement
- Enter delivery address
- Enter customer name
- View order summary
- Place order

### Order Tracking
- Real-time status updates
- Timeline visualization
- Estimated delivery time
- Order details view

### Search & Filter
- Search by restaurant name
- Search by food item
- Real-time results

## Development Notes

### Adding New Restaurants
Edit the `restaurants` array in `backend/server.js`:

```javascript
const restaurants = [
  {
    id: 1,
    name: 'Restaurant Name',
    image: 'image-url',
    rating: 4.5,
    deliveryTime: '30-40 min',
    items: [
      { id: 1, name: 'Dish Name', price: 250, category: 'Category' }
    ]
  }
];
```

### Connecting to Database (MongoDB)
Replace the mock data with MongoDB models:

```javascript
const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: String,
  image: String,
  rating: Number,
  deliveryTime: String,
  items: Array
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
```

## Future Enhancements

- User authentication & registration
- MongoDB integration
- Payment gateway integration
- Admin dashboard
- Real delivery tracking with maps
- Ratings and reviews
- Favorites/wishlist
- Multiple delivery addresses
- Promo codes and discounts
- Notifications

## Troubleshooting

### Backend won't start
- Check if port 5000 is available
- Install dependencies: `npm install`

### Frontend won't connect to backend
- Ensure backend is running on port 5000
- Check CORS is enabled
- Verify API_BASE_URL in `frontend/src/api.js`

### CORS errors
- Ensure CORS middleware is configured in backend
- Check browser console for specific errors

## License
This project is created for educational purposes.

## Support
For issues or questions, refer to the code comments or documentation within each file.

---

**Happy Coding! 🎉**
