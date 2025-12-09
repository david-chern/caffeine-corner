# MongoDB Setup Guide

## Prerequisites

1. **Install MongoDB** (if using locally):
   - macOS: `brew install mongodb-community`
   - Or use MongoDB Atlas (cloud) - https://www.mongodb.com/cloud/atlas

2. **Install Dependencies**:
   ```bash
   npm install
   ```

## Configuration

1. **Create a `.env` file** in the root directory with the following:

   ```env
   # MongoDB Connection String
   # For local MongoDB:
   MONGODB_URI=mongodb://localhost:27017/caffeine-corner
   
   # For MongoDB Atlas (cloud):
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/caffeine-corner?retryWrites=true&w=majority
   
   PORT=3000
   ```

2. **Replace the connection string** with your actual MongoDB URI:
   - **Local**: `mongodb://localhost:27017/caffeine-corner`
   - **Atlas**: Get your connection string from MongoDB Atlas dashboard

## Database Models

The project includes the following models:

### User Model
- Stores customer and admin user information
- Fields: name, email, password, role, addresses

### Product Model
- Stores coffee products, energy drinks, and related items
- Fields: name, description, category, price, images, origin, roastLevel, flavorProfile, stock, grindOptions

### Order Model
- Stores customer orders
- Fields: user reference, items, subtotal, shipping, tax, total, shippingAddress, status, paymentMethod

## Starting the Server

1. Make sure MongoDB is running (if using local MongoDB):
   ```bash
   # macOS with Homebrew
   brew services start mongodb-community
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

   The server will automatically connect to MongoDB on startup.

## Testing the Connection

When the server starts, you should see:
```
MongoDB Connected: localhost (or your Atlas cluster name)
Server is running at http://localhost:3000
```

If you see connection errors, check:
- MongoDB is running (if using local)
- Your `.env` file has the correct `MONGODB_URI`
- Your MongoDB Atlas credentials are correct (if using cloud)

