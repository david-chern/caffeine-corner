# ☕ Caffeine Corner

> **Group 11** - Premium E-Commerce Platform for Coffee Enthusiasts

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-blue.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-ISC-yellow.svg)](LICENSE)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
  - [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [Team Members](#team-members)

---

## 🎯 Overview

**Caffeine Corner** is a modern e-commerce platform designed for coffee enthusiasts to discover, customize, and purchase premium coffee products. We offer a comprehensive selection of coffee beans, roasted and non-roasted varieties, specialty blends, and energy drinks.

Our mission is to bring the finest coffee experience to your doorstep, allowing customers to browse different blends, learn about our roasting process, and order their favorite products online with ease.

---

## ✨ Features

### 🛍️ Product Catalog
- **Roasted Coffee** - Artisan-roasted blends with detailed flavor profiles and roast levels
- **Green Coffee Beans** - Unroasted beans for home roasting enthusiasts  
- **Specialty Blends** - Curated coffee blends from around the world
- **Energy Drinks** - Premium energy drink selection
- **Product Details** - Origin information, tasting notes, and brewing recommendations

### 👥 Customer Experience
- **Browse & Discover** - Explore products by origin, roast level, flavor profile, and price
- **Educational Content** - Learn about our roasting process, brewing methods, and coffee origins
- **Customization** - Create custom coffee blends with personalized grind settings
- **Order Management** - Easy online ordering with secure checkout and order tracking
- **User Authentication** - Secure login and registration system

### 🚀 Future Enhancements
- **Subscription Service** - Monthly coffee subscription boxes with personalized selections
- **Coffee Quiz** - Interactive quiz to recommend the perfect coffee based on taste preferences
- **Brewing Guides** - Step-by-step guides for different brewing methods (espresso, pour-over, French press)
- **Community Reviews** - Customer reviews and ratings for products
- **Loyalty Program** - Points system and rewards for frequent customers
- **Gift Options** - Gift cards and curated gift sets
- **Mobile App** - iOS and Android app for convenient mobile shopping

---

## 🛠️ Technology Stack

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with MongoDB Atlas (cloud)
- **Mongoose** - MongoDB object modeling for Node.js
- **dotenv** - Environment variable management

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with coffee-themed design
- **JavaScript** - Client-side interactivity

### Development Tools
- **Nodemon** - Automatic server restart during development
- **Git** - Version control

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (Node Package Manager) - Comes with Node.js
- **MongoDB Atlas Account** (Free tier available) - [Sign Up](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/david-chern/caffeine-corner.git
   cd caffeine-corner
   ```

2. **Install dependencies**
   
   If you encounter npm cache permission issues, use:
   ```bash
   npm install --cache /tmp/.npm-cache
   ```
   
   Otherwise, simply run:
   ```bash
   npm install
   ```

   This will install:
   - `express` - Web framework
   - `mongoose` - MongoDB ODM
   - `dotenv` - Environment variables
   - `nodemon` - Development tool (dev dependency)

### Environment Setup

1. **Create a `.env` file** in the root directory:
   ```bash
   touch .env
   ```

2. **Add your environment variables** to `.env`:
   ```env
   # MongoDB Atlas Connection String
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/caffeine-corner?retryWrites=true&w=majority
   
   # Server Port (optional, defaults to 3000)
   PORT=3000
   ```

3. **Get your MongoDB Atlas connection string:**
   - Sign up for [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free tier)
   - Create a cluster
   - Click "Connect" → "Connect your application"
   - Copy the connection string and replace `<password>` with your database password
   - Replace `caffeine-corner` with your preferred database name

### Running the Application

**Development mode** (with auto-restart):
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

You should see:
```
MongoDB Connected: [your-cluster-name]
Server is running at http://localhost:3000
```

### Seeding the Database

To populate the database with sample data (users, products, and orders):

```bash
npm run seed
```

This will create:
- 3 Users (1 admin, 2 customers)
- 8 Products (various coffee types and energy drinks)
- 2 Sample Orders

**Note:** Running the seed script will clear all existing data in the database.

---

## 📁 Project Structure

```
caffeine-corner/
├── config/
│   └── database.js          # MongoDB connection configuration
├── models/
│   ├── User.js              # User schema (customers & admins)
│   ├── Product.js           # Product schema (coffee, energy drinks)
│   └── Order.js             # Order schema (customer orders)
├── scripts/
│   └── seedDatabase.js      # Database seeding script
├── utils/
│   └── dbHelpers.js         # Database helper functions
├── public/
│   ├── index.html           # Main landing page (e-commerce design)
│   └── style.css            # Coffee-themed styling
├── .env                     # Environment variables (not in git)
├── .gitignore               # Git ignore rules
├── package.json             # Project dependencies and scripts
├── server.js                # Express server entry point
├── DATABASE_SCHEMA.md       # Detailed database schema documentation
└── README.md                # Project documentation
```

---

## 🗄️ Database Schema

### Entity Relationship Diagram

```mermaid
erDiagram
    USER ||--o{ ORDER : places
    PRODUCT ||--o{ ORDER_ITEM : contains
    ORDER ||--o{ ORDER_ITEM : includes
    
    USER {
        ObjectId _id PK
        String name
        String email UK
        String password
        String role
        Array addresses
        Date createdAt
    }
    
    PRODUCT {
        ObjectId _id PK
        String name
        String description
        String category
        Number price
        Array images
        String origin
        String roastLevel
        Array flavorProfile
        Number stock
        Array grindOptions
        Boolean featured
        Date createdAt
    }
    
    ORDER {
        ObjectId _id PK
        ObjectId user_id FK
        Number subtotal
        Number shipping
        Number tax
        Number total
        Object shippingAddress
        String status
        String paymentMethod
        Date createdAt
        Date updatedAt
    }
    
    ORDER_ITEM {
        ObjectId product_id FK
        Number quantity
        Number price
        String grindOption
    }
```

### Schema Overview

#### User Model
Stores customer and administrator information.
- `name` (String, required) - User's full name
- `email` (String, required, unique) - Unique email address (lowercase)
- `password` (String, required, minlength: 6) - Hashed password
- `role` (Enum: 'customer' | 'admin', default: 'customer') - User role
- `addresses` (Array of address objects) - Shipping addresses
- `createdAt` (Date) - Account creation timestamp

#### Product Model
Stores coffee products, energy drinks, and related items.
- `name` (String, required) - Product name
- `description` (String, required) - Product description
- `category` (Enum: 'roasted-coffee' | 'green-coffee' | 'specialty-blend' | 'energy-drink')
- `price` (Number, required, min: 0) - Product price
- `images` (Array of Strings) - Product image URLs
- `origin` (String) - Coffee origin country/region
- `roastLevel` (Enum: 'light' | 'medium' | 'dark') - Roast level
- `flavorProfile` (Array of Strings) - Flavor descriptors
- `stock` (Number, default: 0) - Available stock quantity
- `grindOptions` (Array of Strings) - Available grind options
- `featured` (Boolean, default: false) - Featured product flag
- `createdAt` (Date) - Product creation timestamp

#### Order Model
Stores customer orders with items and shipping information.
- `user` (ObjectId, reference to User) - Order owner
- `items` (Array of order items) - Order items (embedded schema)
- `subtotal` (Number, required) - Subtotal before tax/shipping
- `shipping` (Number, default: 0) - Shipping cost
- `tax` (Number, default: 0) - Tax amount
- `total` (Number, required) - Total order amount
- `shippingAddress` (Address object) - Delivery address
- `status` (Enum: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled')
- `paymentMethod` (Enum: 'credit-card' | 'paypal' | 'debit-card')
- `createdAt` (Date) - Order creation timestamp
- `updatedAt` (Date) - Last update timestamp

### Relationships

1. **User → Order (One-to-Many)**: One user can place multiple orders
2. **Order → Order Item (One-to-Many)**: One order contains multiple items
3. **Product → Order Item (One-to-Many)**: One product can appear in multiple orders

For detailed schema documentation, see [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)

---

## 🔧 Database Utilities

### Helper Functions

The project includes database helper utilities in `utils/dbHelpers.js`:

- **User Helpers**: `findByEmail()`, `findById()`, `create()`, `findAll()`
- **Product Helpers**: `findAll()`, `findById()`, `create()`, `updateStock()`, `getFeatured()`, `search()`
- **Order Helpers**: `findAll()`, `findById()`, `create()`, `updateStatus()`, `findByUser()`

### Usage Example

```javascript
const { product, user, order } = require('./utils/dbHelpers');

// Get featured products
const featured = await product.getFeatured();

// Find user by email
const user = await user.findByEmail('user@example.com');

// Create order
const newOrder = await order.create({
  user: userId,
  items: [{ product: productId, quantity: 2, price: 18.99 }],
  shipping: 5.99
});
```

## 📡 API Documentation

API endpoints will be documented here as they are developed.

### Current Endpoints
- `GET /` - Serves the main landing page (`index.html`)

---

## 👥 Team Members

- **Jaskaran** - Developer
- **David** - Developer

---

## 🤝 Contributing

This is a term project for **Group 11**. Team members should:

1. Create a new branch for your feature: `git checkout -b feature/your-feature-name`
2. Make your changes and commit: `git commit -m 'Add some feature'`
3. Push to the branch: `git push origin feature/your-feature-name`
4. Submit a pull request for review

Please follow standard git workflow practices and ensure all code is tested before submitting.

---

## 📝 License

This project is licensed under the ISC License.

---

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Node.js Documentation](https://nodejs.org/docs/)

---

**Built with ☕ by Group 11**
