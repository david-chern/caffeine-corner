# 🎯 Demo Guide for Caffeine Corner

## Quick Start for Demonstration

### 1. Start the Server
```bash
npm run dev
```
The server will start on `http://localhost:3000`

### 2. Seed the Database
In a new terminal:
```bash
npm run seed
```

This will populate the database with:
- ✅ 3 Users (1 admin: admin@caffeinecorner.com, 2 customers)
- ✅ 8 Products (various coffee types and energy drinks)
- ✅ 2 Sample Orders

### 3. View the Application
Open your browser to: `http://localhost:3000`

## Database Schema Visualization

The database schema diagram is available in:
- **README.md** - Embedded Mermaid diagram
- **DATABASE_SCHEMA.md** - Detailed documentation

## Key Features to Demo

### ✅ Database Module
- **Models**: User, Product, Order (all defined and working)
- **Seeding**: Sample data script ready (`npm run seed`)
- **Helper Functions**: Database utilities in `utils/dbHelpers.js`
- **Schema Design**: Complete ER diagram with relationships

### ✅ E-Commerce Design
- **Modern UI**: Professional landing page with hero section
- **Product Display**: Featured products grid
- **Navigation**: Sticky navbar with smooth scrolling
- **Authentication**: Login/Register forms
- **Responsive**: Mobile-friendly design

### ✅ Full-Stack Vision
- **Frontend**: HTML, CSS, JavaScript (ready for API integration)
- **Backend**: Express.js with MongoDB connection
- **Database**: MongoDB Atlas with Mongoose ODM
- **Architecture**: MVC pattern with models, utilities, and routes ready

## Database Collections Summary

1. **Users Collection**
   - Customer and admin accounts
   - Authentication ready (password field included)
   - Address management

2. **Products Collection**
   - Coffee products with detailed attributes
   - Categories: roasted-coffee, green-coffee, specialty-blend, energy-drink
   - Stock management
   - Featured products flag

3. **Orders Collection**
   - Customer orders with items
   - Order status tracking
   - Payment method tracking
   - Shipping address storage

## Files to Highlight

- `models/` - Database schemas (User, Product, Order)
- `config/database.js` - MongoDB connection
- `scripts/seedDatabase.js` - Database seeding
- `utils/dbHelpers.js` - Database helper functions
- `DATABASE_SCHEMA.md` - Complete schema documentation
- `public/index.html` - E-commerce landing page
- `README.md` - Complete project documentation with schema diagram

