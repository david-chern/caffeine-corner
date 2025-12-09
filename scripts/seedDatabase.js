require('dotenv').config();
const connectDB = require('../config/database');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

const seedDatabase = async () => {
  try {
    // Connect to database
    await connectDB();
    
    console.log('🌱 Starting database seeding...\n');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    console.log('✓ Cleared existing data\n');

    // Seed Users
    const users = await User.insertMany([
      {
        name: 'Admin User',
        email: 'admin@caffeinecorner.com',
        password: 'admin123',
        role: 'admin',
        addresses: [{
          street: '123 Coffee St',
          city: 'Seattle',
          state: 'WA',
          zipCode: '98101',
          country: 'USA'
        }]
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'customer',
        addresses: [{
          street: '456 Brew Avenue',
          city: 'Portland',
          state: 'OR',
          zipCode: '97201',
          country: 'USA'
        }]
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123',
        role: 'customer'
      }
    ]);
    console.log(`✓ Created ${users.length} users`);

    // Seed Products
    const products = await Product.insertMany([
      {
        name: 'Ethiopian Yirgacheffe',
        description: 'A bright and floral coffee with notes of citrus and jasmine. Single-origin beans from Ethiopia.',
        category: 'roasted-coffee',
        price: 18.99,
        images: ['https://via.placeholder.com/400x400?text=Ethiopian+Yirgacheffe'],
        origin: 'Ethiopia',
        roastLevel: 'light',
        flavorProfile: ['citrus', 'jasmine', 'floral', 'bright'],
        stock: 50,
        grindOptions: ['whole-bean', 'coarse', 'medium', 'fine', 'espresso'],
        featured: true
      },
      {
        name: 'Colombian Supremo',
        description: 'Smooth and well-balanced with notes of caramel and nuts. Medium roast perfection.',
        category: 'roasted-coffee',
        price: 16.99,
        images: ['https://via.placeholder.com/400x400?text=Colombian+Supremo'],
        origin: 'Colombia',
        roastLevel: 'medium',
        flavorProfile: ['caramel', 'nutty', 'smooth', 'balanced'],
        stock: 75,
        grindOptions: ['whole-bean', 'medium', 'fine'],
        featured: true
      },
      {
        name: 'Dark Roast Espresso Blend',
        description: 'Bold and rich with dark chocolate notes. Perfect for espresso lovers.',
        category: 'roasted-coffee',
        price: 19.99,
        images: ['https://via.placeholder.com/400x400?text=Dark+Roast+Espresso'],
        origin: 'Brazil',
        roastLevel: 'dark',
        flavorProfile: ['dark chocolate', 'bold', 'smoky', 'rich'],
        stock: 60,
        grindOptions: ['whole-bean', 'fine', 'espresso'],
        featured: true
      },
      {
        name: 'Guatemalan Green Beans',
        description: 'Raw, unroasted coffee beans for home roasters. High-quality single-origin beans.',
        category: 'green-coffee',
        price: 14.99,
        images: ['https://via.placeholder.com/400x400?text=Green+Coffee+Beans'],
        origin: 'Guatemala',
        stock: 100,
        grindOptions: [],
        featured: false
      },
      {
        name: 'House Blend Premium',
        description: 'Our signature blend combining beans from three continents. Smooth and versatile.',
        category: 'specialty-blend',
        price: 17.99,
        images: ['https://via.placeholder.com/400x400?text=House+Blend'],
        origin: 'Multi-Origin',
        roastLevel: 'medium',
        flavorProfile: ['smooth', 'balanced', 'chocolate', 'caramel'],
        stock: 80,
        grindOptions: ['whole-bean', 'coarse', 'medium', 'fine'],
        featured: true
      },
      {
        name: 'Energy Boost Drink',
        description: 'Natural energy drink with green tea extract and B-vitamins. No artificial sweeteners.',
        category: 'energy-drink',
        price: 3.99,
        images: ['https://via.placeholder.com/400x400?text=Energy+Boost'],
        stock: 200,
        grindOptions: [],
        featured: false
      },
      {
        name: 'Costa Rican Tarrazu',
        description: 'Clean and bright with honey-like sweetness. Perfect for pour-over brewing.',
        category: 'roasted-coffee',
        price: 20.99,
        images: ['https://via.placeholder.com/400x400?text=Costa+Rican+Tarrazu'],
        origin: 'Costa Rica',
        roastLevel: 'light',
        flavorProfile: ['honey', 'bright', 'clean', 'sweet'],
        stock: 45,
        grindOptions: ['whole-bean', 'coarse', 'medium'],
        featured: false
      },
      {
        name: 'Italian Espresso Roast',
        description: 'Traditional Italian-style espresso roast. Intense and full-bodied.',
        category: 'roasted-coffee',
        price: 18.49,
        images: ['https://via.placeholder.com/400x400?text=Italian+Espresso'],
        origin: 'Italy',
        roastLevel: 'dark',
        flavorProfile: ['intense', 'full-bodied', 'bold', 'creamy'],
        stock: 55,
        grindOptions: ['whole-bean', 'fine', 'espresso'],
        featured: false
      }
    ]);
    console.log(`✓ Created ${products.length} products\n`);

    // Seed Orders (create orders for existing users)
    const orders = await Order.insertMany([
      {
        user: users[1]._id,
        items: [
          {
            product: products[0]._id,
            quantity: 2,
            price: products[0].price,
            grindOption: 'whole-bean'
          },
          {
            product: products[1]._id,
            quantity: 1,
            price: products[1].price,
            grindOption: 'medium'
          }
        ],
        subtotal: (products[0].price * 2) + products[1].price,
        shipping: 5.99,
        tax: ((products[0].price * 2) + products[1].price + 5.99) * 0.1,
        total: ((products[0].price * 2) + products[1].price + 5.99) * 1.1,
        shippingAddress: {
          street: '456 Brew Avenue',
          city: 'Portland',
          state: 'OR',
          zipCode: '97201',
          country: 'USA'
        },
        status: 'delivered',
        paymentMethod: 'credit-card'
      },
      {
        user: users[2]._id,
        items: [
          {
            product: products[2]._id,
            quantity: 1,
            price: products[2].price,
            grindOption: 'espresso'
          }
        ],
        subtotal: products[2].price,
        shipping: 4.99,
        tax: (products[2].price + 4.99) * 0.1,
        total: (products[2].price + 4.99) * 1.1,
        shippingAddress: {
          street: '789 Java Lane',
          city: 'San Francisco',
          state: 'CA',
          zipCode: '94102',
          country: 'USA'
        },
        status: 'shipped',
        paymentMethod: 'paypal'
      }
    ]);
    console.log(`✓ Created ${orders.length} orders\n`);

    // Display summary
    console.log('📊 Database Seeding Summary:');
    console.log(`   Users: ${users.length}`);
    console.log(`   Products: ${products.length}`);
    console.log(`   Orders: ${orders.length}\n`);
    console.log('✅ Database seeding completed successfully!\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

