const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import routes
const restaurantRoutes = require('./src/routes/restaurantRoutes');
const orderRoutes = require('./src/routes/orderRoutes');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// ============================================
// MIDDLEWARE
// ============================================

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware
app.use(cors({
  origin: '*',
  credentials: true
}));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// ============================================
// ROUTES
// ============================================

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/orders', orderRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Food Delivery App API',
    version: '1.0.0',
    endpoints: {
      restaurants: '/api/restaurants',
      orders: '/api/orders',
      health: '/health'
    }
  });
});

// ============================================
// ERROR HANDLING
// ============================================

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    path: req.path,
    method: req.method
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error',
    timestamp: new Date().toISOString()
  });
});

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
  console.log(`\n${'='.repeat(50)}`);
  console.log(`🍕 Food Delivery App - Backend Server`);
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`${'='.repeat(50)}\n`);
  console.log(`📡 API Endpoints:`);
  console.log(`   - GET  /api/restaurants         (Get all restaurants)`);
  console.log(`   - GET  /api/restaurants/:id     (Get restaurant by ID)`);
  console.log(`   - GET  /api/restaurants/cuisines (Get all cuisines)`);
  console.log(`   - GET  /api/restaurants/search  (Search restaurants)`);
  console.log(`   - GET  /api/orders              (Get all orders)`);
  console.log(`   - POST /api/orders              (Create new order)`);
  console.log(`   - GET  /api/orders/:id          (Get order by ID)`);
  console.log(`   - PUT  /api/orders/:id/status   (Update order status)`);
  console.log(`   - GET  /health                  (Health check)`);
  console.log(`\n`);
});

module.exports = app;
