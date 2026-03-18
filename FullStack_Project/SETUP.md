## Quick Start Guide

### Prerequisites
- Node.js and npm installed

### Installation

1. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

### Running the Application

**Terminal 1 - Start Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Start Frontend:**
```bash
cd frontend
npm start
```

Your app will open at `http://localhost:3000`

---

### Project Overview

**FoodHub** is a full-stack food delivery application similar to Zomato.

**Key Components:**

1. **Backend (Node.js + Express)**
   - REST API endpoints for restaurants and orders
   - Mock data for demo
   - Handles order management

2. **Frontend (React)**
   - Home page with restaurant listing
   - Restaurant detail and menu
   - Shopping cart management
   - Checkout process
   - Order tracking page
   - Order history

3. **State Management**
   - React Context API for cart
   - Local state for components

### How to Use

1. Browse restaurants on home page
2. Click a restaurant to view its menu
3. Add items to cart
4. Go to cart to review items
5. Proceed to checkout
6. Enter delivery details
7. Place order
8. Track order status
9. View all past orders

### File Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Home.js
│   │   ├── RestaurantCard.js
│   │   ├── RestaurantDetail.js
│   │   ├── Cart.js
│   │   ├── Checkout.js
│   │   ├── OrderStatus.js
│   │   ├── OrderHistory.js
│   │   └── Navbar.js
│   ├── context/
│   │   └── CartContext.js
│   ├── styles/
│   │   └── (CSS files for each component)
│   ├── api.js
│   ├── App.js
│   └── index.js
└── public/
    └── index.html

backend/
├── server.js (Main API server)
├── package.json
└── .env
```

### API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/restaurants` | Get all restaurants |
| GET | `/api/restaurants/:id` | Get restaurant details |
| GET | `/api/restaurants/:id/items` | Get restaurant menu |
| GET | `/api/search?q=query` | Search restaurants/food |
| POST | `/api/orders` | Place new order |
| GET | `/api/orders` | Get all orders |
| GET | `/api/orders/:id` | Get order details |
| PUT | `/api/orders/:id/status` | Update order status |
| DELETE | `/api/orders/:id` | Cancel order |

### Sample Restaurants

1. **Pizza Palace** - Italian
2. **Burger Barn** - American  
3. **Sushi Supreme** - Japanese

Each comes with sample menu items and prices.

### Notes for Students

- All code is well-commented
- Follow React best practices
- Use React Router for navigation
- Manage state with Context API
- Make API calls with Axios
- Style with vanilla CSS
- Test all features before submission

---

**Good luck with your project! 🚀**
