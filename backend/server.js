require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(helmet()); // Security headers
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL, 'https://eco-loop.vercel.app', 'https://your-production-domain.com']
    : ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:5174', 'http://localhost:3001'],
  credentials: true
}));
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // Limit each IP to 500 requests per windowMs (increased for development)
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/pickups', require('./routes/pickups'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/worker', require('./routes/worker'));

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'EcoLoop API is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server
const PORT = process.env.PORT || 5000;

// Only start server if not in Vercel (Vercel uses serverless functions)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
  });
}

// Export for Vercel
module.exports = app;
