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
├── public/
│   ├── index.html           # Main landing page
│   └── style.css            # Coffee-themed styling
├── .env                     # Environment variables (not in git)
├── .gitignore               # Git ignore rules
├── package.json             # Project dependencies and scripts
├── server.js                # Express server entry point
└── README.md                # Project documentation
```

---

## 🗄️ Database Schema

### User Model
Stores customer and administrator information.
- `name` (String, required)
- `email` (String, required, unique)
- `password` (String, required, minlength: 6)
- `role` (Enum: 'customer' | 'admin', default: 'customer')
- `addresses` (Array of address objects)
- `createdAt` (Date)

### Product Model
Stores coffee products, energy drinks, and related items.
- `name` (String, required)
- `description` (String, required)
- `category` (Enum: 'roasted-coffee' | 'green-coffee' | 'specialty-blend' | 'energy-drink')
- `price` (Number, required, min: 0)
- `images` (Array of Strings)
- `origin` (String)
- `roastLevel` (Enum: 'light' | 'medium' | 'dark')
- `flavorProfile` (Array of Strings)
- `stock` (Number, default: 0)
- `grindOptions` (Array of Strings)
- `featured` (Boolean, default: false)
- `createdAt` (Date)

### Order Model
Stores customer orders with items and shipping information.
- `user` (ObjectId, reference to User)
- `items` (Array of order items with product, quantity, price)
- `subtotal` (Number, required)
- `shipping` (Number, default: 0)
- `tax` (Number, default: 0)
- `total` (Number, required)
- `shippingAddress` (Address object)
- `status` (Enum: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled')
- `paymentMethod` (Enum: 'credit-card' | 'paypal' | 'debit-card')
- `createdAt` (Date)
- `updatedAt` (Date)

---

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
