const mongoose = require('mongoose');

const connectDB = async () => {
  // Check if already connected
  if (mongoose.connection.readyState >= 1) {
    console.log('Using existing MongoDB connection');
    return;
  }

  try {
    // Mongoose automatically handles connection pooling
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000, // Increased to 10 seconds
      socketTimeoutMS: 45000,
      maxPoolSize: 10, // Maximum number of connections in the pool
      minPoolSize: 2,  // Minimum number of connections
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error('Full error:', error);
    throw error; // Don't exit process in serverless
  }
};

module.exports = connectDB;
