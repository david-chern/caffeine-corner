# ☕ Caffeine Corner

> **Group 11** - Premium E-Commerce Platform for Coffee Enthusiasts
> <br>David Chernyak, Jaskaran Singh
> **Link to website: https://caffeine-corner.onrender.com**

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-blue.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-ISC-yellow.svg)](LICENSE)
[![Responsive](https://img.shields.io/badge/Responsive-Mobile%20Friendly-success.svg)]()

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
  - [Running the Application](#running-the-application)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Authentication & Security](#-authentication--security)
- [Responsive Design](#-responsive-design)
- [Contributing](#-contributing)
- [Team Members](#-team-members)
- [License](#-license)

---

## 🎯 Overview

**Caffeine Corner** is a modern, full-stack e-commerce platform designed for coffee enthusiasts to discover, customize, and purchase premium coffee products. Built with Node.js, Express.js, and MongoDB, the platform offers a seamless shopping experience with user authentication, secure payment processing, and comprehensive account management.

### Key Highlights

- 🛍️ **Complete E-Commerce Solution** - Browse, cart, checkout, and order management
- 🔐 **Secure Authentication** - JWT-based user authentication with password hashing
- 📱 **Fully Responsive** - Mobile-first design that works on all devices
- ☕ **Premium Products** - 20+ coffee products with detailed information
- 💳 **Payment Integration** - Support for credit/debit cards and PayPal
- 👤 **User Accounts** - Profile management, address management, and order history

---

## ✨ Features

### 🛍️ Product Catalog

- **20+ Premium Products** - Extensive selection of coffee and beverages
- **Roasted Coffee** - Artisan-roasted blends with detailed flavor profiles and roast levels (Light, Medium, Dark)
- **Green Coffee Beans** - Unroasted beans for home roasting enthusiasts  
- **Specialty Blends** - Curated coffee blends from around the world (including flavored varieties)
- **Energy Drinks** - Premium energy drink selection
- **Product Details** - Origin information, tasting notes, and brewing recommendations
- **Grind Options** - Customizable grind settings (Whole Bean, Coarse, Medium, Fine, Espresso)
- **Product Images** - High-quality product images with responsive display

### 👥 Customer Experience

- **Browse & Discover** - Explore products by origin, roast level, flavor profile, and price
- **Product Details** - Detailed product pages with images, descriptions, and flavor profiles
- **Shopping Cart** - Add items to cart with grind option selection, quantity management, and real-time totals
- **Free Shipping** - Free shipping on orders over $50 with progress indicator
- **Checkout Process** - Secure checkout with shipping information and payment method selection
- **Payment Forms** - Dynamic payment forms for credit/debit cards and PayPal
- **Order Management** - Complete order processing with order confirmation and tracking
- **Recommended Products** - "You May Also Like" suggestions on product detail pages

### 🔐 User Authentication & Account Management

- **User Registration** - Secure account creation with email validation
- **User Login** - JWT-based authentication with session management
- **Account Dashboard** - Beautiful modal dashboard with quick access to account features
- **Profile Management** - View and edit personal information (name, email)
- **Address Management** - Add, edit, and delete multiple shipping addresses
- **Password Management** - Secure password change functionality
- **Order History** - View past orders (placeholder for future implementation)
- **Session Persistence** - Stay logged in across page refreshes

### 📱 Responsive Design

- **Mobile-First Approach** - Optimized for mobile devices
- **Responsive Breakpoints** - Desktop (968px+), Tablet (768px-968px), Mobile (480px-768px), Small Mobile (<480px)
- **Hamburger Menu** - Mobile-friendly navigation menu
- **Touch-Friendly** - All buttons and interactive elements optimized for touch
- **iOS Optimization** - Prevents zoom on input focus (16px font size)
- **Flexible Layouts** - Grid systems that adapt to screen size
- **Responsive Images** - Images that scale properly on all devices

### 🎨 User Interface

- **Modern Design** - Coffee-themed color palette and styling
- **Smooth Animations** - Fade-in effects and transitions
- **Interactive Elements** - Hover effects and visual feedback
- **Loading States** - User-friendly loading indicators
- **Error Handling** - Clear error messages and validation feedback
- **Success Messages** - Confirmation messages for user actions

---

## 🛠️ Technology Stack

### Backend

- **Node.js** (v18+) - JavaScript runtime environment
- **Express.js** (v4.18) - Web application framework
- **MongoDB Atlas** - Cloud-hosted NoSQL database
- **Mongoose** (v8.0) - MongoDB object modeling for Node.js
- **bcryptjs** (v3.0) - Password hashing and encryption
- **jsonwebtoken** (v9.0) - JWT token generation and verification
- **dotenv** (v16.3) - Environment variable management

### Frontend

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with coffee-themed design, responsive media queries
- **JavaScript (ES6+)** - Client-side interactivity, async/await, localStorage
- **Responsive CSS** - Mobile-first design with flexible layouts

### Development Tools

- **Nodemon** (v3.0) - Automatic server restart during development
- **Git** - Version control
- **MongoDB Atlas** - Cloud database hosting

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
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
   
   ```bash
   npm install
   ```
   
   This will install:
   - `express` - Web framework
   - `mongoose` - MongoDB ODM
   - `bcryptjs` - Password hashing
   - `jsonwebtoken` - JWT authentication
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
   
   # JWT Secret Key (change this in production!)
   JWT_SECRET=your-secret-key-change-in-production
   
   # Server Port (optional, defaults to 3000)
   PORT=3000
   ```

3. **Get your MongoDB Atlas connection string:**
   - Sign up for [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free tier)
   - Create a cluster
   - Click "Connect" → "Connect your application"
   - Copy the connection string and replace `<password>` with your database password
   - Replace `caffeine-corner` with your preferred database name
   - **Important:** Add your IP address to the Network Access whitelist in MongoDB Atlas

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
- 20 Products (various coffee types, specialty blends, and energy drinks)
- 2 Sample Orders

**Note:** Running the seed script will clear all existing data in the database.

**Default Admin Credentials:**
- Email: `admin@caffeinecorner.com`
- Password: `admin123`

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
│   ├── index.html           # Main landing page
│   ├── cart.html            # Shopping cart page
│   ├── checkout.html        # Checkout page
│   ├── product.html         # Product detail page
│   ├── account.html         # User account management page
│   ├── style.css            # Main stylesheet (responsive)
│   ├── cart.css             # Cart and checkout styling
│   ├── product-detail.css   # Product detail page styling
│   ├── account.css          # Account page styling
│   └── js/
│       ├── auth.js          # Authentication logic (login, register, logout)
│       ├── account.js       # Account management functionality
│       ├── cart.js          # Shopping cart functionality
│       ├── checkout.js      # Checkout and payment processing
│       ├── product.js       # Product detail functionality
│       └── navigation.js    # Mobile menu navigation
├── .env                     # Environment variables (not in git)
├── .gitignore               # Git ignore rules
├── package.json             # Project dependencies and scripts
├── server.js                # Express server entry point
├── DATABASE_SCHEMA.md       # Detailed database schema documentation
├── DATABASE_SETUP.md        # Database setup guide
├── DEMO_GUIDE.md            # Demo guide for presentations
└── README.md                # Project documentation (this file)
```

---

## 📡 API Documentation

### Authentication Endpoints

#### `POST /api/auth/register`
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer"
  }
}
```

#### `POST /api/auth/login`
Login with email and password.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer"
  }
}
```

#### `GET /api/auth/me`
Get current user information (Protected route - requires JWT token).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer",
    "addresses": []
  }
}
```

#### `PUT /api/auth/me`
Update current user information (Protected route).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "name": "John Updated",
  "email": "newemail@example.com",
  "addresses": [
    {
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001",
      "country": "USA"
    }
  ]
}
```

#### `POST /api/auth/change-password`
Change user password (Protected route).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword123"
}
```

### Product Endpoints

#### `GET /api/products`
Get all products.

**Response:**
```json
{
  "success": true,
  "products": [
    {
      "_id": "product_id",
      "name": "Ethiopian Yirgacheffe",
      "description": "Light roast with floral notes",
      "category": "roasted-coffee",
      "price": 18.99,
      "images": ["image_url"],
      "origin": "Ethiopia",
      "roastLevel": "light",
      "flavorProfile": ["floral", "citrus"],
      "stock": 100,
      "grindOptions": ["Whole Bean", "Coarse", "Medium", "Fine"]
    }
  ]
}
```

#### `GET /api/products/:id`
Get a single product by ID.

**Response:**
```json
{
  "success": true,
  "product": {
    "_id": "product_id",
    "name": "Ethiopian Yirgacheffe",
    "description": "Light roast with floral notes",
    "category": "roasted-coffee",
    "price": 18.99,
    "images": ["image_url"],
    "origin": "Ethiopia",
    "roastLevel": "light",
    "flavorProfile": ["floral", "citrus"],
    "stock": 100,
    "grindOptions": ["Whole Bean", "Coarse", "Medium", "Fine"]
  }
}
```

### Order Endpoints

#### `POST /api/checkout`
Process checkout and create an order.

**Request Body:**
```json
{
  "items": [
    {
      "productId": "product_id",
      "quantity": 2,
      "price": 18.99,
      "grindOption": "Whole Bean"
    }
  ],
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "paymentMethod": "credit-card",
  "paymentDetails": {
    "cardholderName": "John Doe",
    "cardNumber": "4111111111111111",
    "expirationDate": "12/25",
    "cvv": "123",
    "billingZip": "10001"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Order placed successfully",
  "order": {
    "_id": "order_id",
    "user": "user_id",
    "items": [...],
    "subtotal": 37.98,
    "shipping": 0,
    "tax": 3.04,
    "total": 41.02,
    "status": "pending",
    "createdAt": "2025-01-XX"
  }
}
```

#### `GET /api/orders/:orderId`
Get order details by ID.

**Response:**
```json
{
  "success": true,
  "order": {
    "_id": "order_id",
    "user": "user_id",
    "items": [...],
    "subtotal": 37.98,
    "shipping": 0,
    "tax": 3.04,
    "total": 41.02,
    "status": "pending",
    "createdAt": "2025-01-XX"
  }
}
```

### Frontend Routes

- `GET /` - Serves the main landing page (`index.html`)
- `GET /cart.html` - Shopping cart page
- `GET /checkout.html` - Checkout page
- `GET /product.html?id=<productId>` - Product detail page
- `GET /account.html` - User account management page

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
- `password` (String, required, minlength: 6) - Hashed password using bcrypt
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

For detailed schema documentation, see [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)

---

## 🔐 Authentication & Security

### JWT Authentication

The application uses JSON Web Tokens (JWT) for secure authentication:

- **Token Generation**: Tokens are generated upon successful login/registration
- **Token Expiration**: Tokens expire after 7 days
- **Token Storage**: Tokens are stored in browser localStorage
- **Protected Routes**: API endpoints requiring authentication use the `authenticateToken` middleware

### Password Security

- **Hashing**: Passwords are hashed using bcryptjs before storage
- **Minimum Length**: Passwords must be at least 6 characters
- **Password Comparison**: Secure password comparison using bcrypt
- **Password Change**: Requires current password verification

### Security Best Practices

- Environment variables for sensitive data (JWT secret, MongoDB URI)
- Input validation on all API endpoints
- CORS middleware for cross-origin requests
- Error handling without exposing sensitive information
- MongoDB Atlas IP whitelisting for database security

---

## 📱 Responsive Design

### Breakpoints

| Breakpoint | Screen Size | Layout Changes |
|------------|-------------|----------------|
| **Desktop** | > 968px | Multi-column grids, full navigation |
| **Tablet** | 768px - 968px | Adjusted grids, smaller fonts |
| **Mobile** | 480px - 768px | Single column, hamburger menu |
| **Small Mobile** | < 480px | Compact layout, minimal spacing |

### Mobile Features

- **Hamburger Menu**: Collapsible navigation menu
- **Touch-Friendly**: All buttons optimized for touch (minimum 44px)
- **iOS Optimization**: 16px font size prevents zoom on input focus
- **Responsive Images**: Images scale properly on all devices
- **Flexible Layouts**: Grid systems adapt to screen size
- **Mobile Forms**: Full-width inputs, optimized spacing

### Responsive Pages

- ✅ Homepage - Fully responsive with mobile menu
- ✅ Product Pages - Responsive product cards and details
- ✅ Cart - Mobile-friendly cart items and summary
- ✅ Checkout - Responsive forms and payment options
- ✅ Account - Mobile-optimized account management

---

## 🚀 Future Enhancements

- **Subscription Service** - Monthly coffee subscription boxes with personalized selections
- **Coffee Quiz** - Interactive quiz to recommend the perfect coffee based on taste preferences
- **Brewing Guides** - Step-by-step guides for different brewing methods
- **Community Reviews** - Customer reviews and ratings for products
- **Loyalty Program** - Points system and rewards for frequent customers
- **Gift Options** - Gift cards and curated gift sets
- **Email Notifications** - Order confirmations and shipping updates
- **Admin Dashboard** - Product management and order processing interface
- **Search & Filters** - Advanced product search and filtering
- **Wishlist** - Save favorite products for later

---

## 👥 Team Members

- **Jaskaran Singh** - Developer
- **David Chern** - Developer

---

## 🤝 Contributing

This is a term project for **Group 11**. Team members should:

1. Create a new branch for your feature: `git checkout -b feature/your-feature-name`
2. Make your changes and commit: `git commit -m 'Add some feature'`
3. Push to the branch: `git push origin feature/your-feature-name`
4. Submit a pull request for review

Please follow standard git workflow practices and ensure all code is tested before submitting.

### Code Style Guidelines

- Use ES6+ JavaScript features (async/await, arrow functions)
- Follow consistent naming conventions (camelCase for variables, PascalCase for components)
- Add comments for complex logic
- Keep functions focused and single-purpose
- Use meaningful variable and function names

---

## 📝 License

This project is licensed under the ISC License.

---

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [JWT.io](https://jwt.io/) - JWT token debugging and information
- [bcryptjs Documentation](https://www.npmjs.com/package/bcryptjs)

---

## 🐛 Troubleshooting

### Common Issues

**Database Connection Failed**
- Check your MongoDB Atlas IP whitelist settings
- Verify your connection string in `.env`
- Ensure your MongoDB Atlas cluster is running

**Port Already in Use**
- Change the PORT in `.env` file
- Or kill the process using the port: `lsof -ti:3000 | xargs kill`

**JWT Token Errors**
- Ensure JWT_SECRET is set in `.env`
- Clear browser localStorage and login again
- Check token expiration (tokens expire after 7 days)

**npm Install Issues**
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`, then run `npm install` again
- Ensure Node.js version is 18 or higher

---

**Built with ☕ by Group 11**

For questions or support, please open an issue on GitHub.
