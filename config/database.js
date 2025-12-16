const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });

    console.log(`✓ MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`✗ MongoDB Connection Error: ${error.message}`);
    console.error(`\n⚠️  Please check:`);
    console.error(`   1. Your IP address is whitelisted in MongoDB Atlas`);
    console.error(`   2. Your MongoDB connection string is correct`);
    console.error(`   3. Your network connection is working\n`);
    console.error(`   Server will continue running but database features may not work.\n`);
    return false;
  }
};

module.exports = connectDB;

