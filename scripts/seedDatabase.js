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
        images: ['https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=800&fit=crop'],
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
        images: ['https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800&h=800&fit=crop'],
        origin: 'Italy',
        roastLevel: 'dark',
        flavorProfile: ['intense', 'full-bodied', 'bold', 'creamy'],
        stock: 55,
        grindOptions: ['whole-bean', 'fine', 'espresso'],
        featured: false
      },
      {
        name: 'Sumatra Mandheling',
        description: 'Full-bodied and earthy with low acidity. Deep, rich flavors with hints of dark chocolate and spice.',
        category: 'roasted-coffee',
        price: 19.99,
        images: ['https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&h=800&fit=crop'],
        origin: 'Indonesia',
        roastLevel: 'dark',
        flavorProfile: ['earthy', 'dark chocolate', 'spicy', 'full-bodied'],
        stock: 65,
        grindOptions: ['whole-bean', 'coarse', 'medium', 'fine'],
        featured: true
      },
      {
        name: 'Kenyan AA',
        description: 'Bright and wine-like with complex berry notes. Highly sought after single-origin coffee.',
        category: 'roasted-coffee',
        price: 22.99,
        images: ['https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&h=800&fit=crop'],
        origin: 'Kenya',
        roastLevel: 'medium',
        flavorProfile: ['wine-like', 'berry', 'bright', 'complex'],
        stock: 40,
        grindOptions: ['whole-bean', 'coarse', 'medium', 'fine'],
        featured: true
      },
      {
        name: 'Hawaiian Kona',
        description: 'Smooth and mild with delicate floral notes. One of the world\'s most prized coffees from the slopes of Mauna Loa.',
        category: 'roasted-coffee',
        price: 34.99,
        images: ['https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=800&fit=crop'],
        origin: 'Hawaii',
        roastLevel: 'medium',
        flavorProfile: ['smooth', 'floral', 'mild', 'delicate'],
        stock: 30,
        grindOptions: ['whole-bean', 'coarse', 'medium', 'fine'],
        featured: true
      },
      {
        name: 'French Vanilla Blend',
        description: 'Smooth medium roast with natural vanilla flavoring. Perfect for those who enjoy flavored coffees.',
        category: 'specialty-blend',
        price: 16.99,
        images: ['https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800&h=800&fit=crop'],
        origin: 'Multi-Origin',
        roastLevel: 'medium',
        flavorProfile: ['vanilla', 'smooth', 'sweet', 'creamy'],
        stock: 90,
        grindOptions: ['whole-bean', 'coarse', 'medium', 'fine'],
        featured: false
      },
      {
        name: 'Hazelnut Crème',
        description: 'Rich medium-dark roast with natural hazelnut flavor. A customer favorite for its nutty sweetness.',
        category: 'specialty-blend',
        price: 17.49,
        images: ['https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&h=800&fit=crop'],
        origin: 'Multi-Origin',
        roastLevel: 'medium',
        flavorProfile: ['hazelnut', 'nutty', 'sweet', 'rich'],
        stock: 85,
        grindOptions: ['whole-bean', 'coarse', 'medium', 'fine'],
        featured: false
      },
      {
        name: 'Decaf Colombian',
        description: 'Smooth and balanced decaffeinated coffee. Swiss water processed to preserve flavor without chemicals.',
        category: 'roasted-coffee',
        price: 18.99,
        images: ['https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=800&fit=crop'],
        origin: 'Colombia',
        roastLevel: 'medium',
        flavorProfile: ['smooth', 'balanced', 'nutty', 'mild'],
        stock: 70,
        grindOptions: ['whole-bean', 'coarse', 'medium', 'fine'],
        featured: false
      },
      {
        name: 'Jamaican Blue Mountain',
        description: 'Legendary coffee known for its mild flavor and lack of bitterness. Smooth, sweet, and balanced.',
        category: 'roasted-coffee',
        price: 49.99,
        images: ['https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=800&fit=crop'],
        origin: 'Jamaica',
        roastLevel: 'medium',
        flavorProfile: ['mild', 'sweet', 'smooth', 'balanced'],
        stock: 25,
        grindOptions: ['whole-bean', 'coarse', 'medium', 'fine'],
        featured: true
      },
      {
        name: 'Peruvian Organic',
        description: 'Certified organic single-origin coffee. Bright acidity with notes of chocolate and nuts.',
        category: 'roasted-coffee',
        price: 19.49,
        images: ['https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&h=800&fit=crop'],
        origin: 'Peru',
        roastLevel: 'medium',
        flavorProfile: ['chocolate', 'nutty', 'bright', 'organic'],
        stock: 60,
        grindOptions: ['whole-bean', 'coarse', 'medium', 'fine'],
        featured: false
      },
      {
        name: 'Espresso Blend Deluxe',
        description: 'Our premium espresso blend combining South American and African beans. Perfect for cappuccinos and lattes.',
        category: 'specialty-blend',
        price: 21.99,
        images: ['https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=800&fit=crop'],
        origin: 'Multi-Origin',
        roastLevel: 'dark',
        flavorProfile: ['bold', 'creamy', 'chocolate', 'smooth'],
        stock: 50,
        grindOptions: ['whole-bean', 'fine', 'espresso'],
        featured: true
      },
      {
        name: 'Vietnamese Robusta',
        description: 'Strong and bold Vietnamese coffee with traditional dark roast. Perfect for Vietnamese iced coffee.',
        category: 'roasted-coffee',
        price: 15.99,
        images: ['https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&h=800&fit=crop'],
        origin: 'Vietnam',
        roastLevel: 'dark',
        flavorProfile: ['bold', 'strong', 'smoky', 'intense'],
        stock: 75,
        grindOptions: ['whole-bean', 'coarse', 'medium', 'fine'],
        featured: false
      },
      {
        name: 'Breakfast Blend',
        description: 'Light and smooth morning blend. Designed to start your day right with balanced flavor.',
        category: 'specialty-blend',
        price: 16.49,
        images: ['https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&h=800&fit=crop'],
        origin: 'Multi-Origin',
        roastLevel: 'light',
        flavorProfile: ['smooth', 'balanced', 'bright', 'light'],
        stock: 95,
        grindOptions: ['whole-bean', 'coarse', 'medium', 'fine'],
        featured: false
      },
      {
        name: 'Ethiopian Green Beans',
        description: 'Premium unroasted Ethiopian beans for home roasters. Experience the joy of roasting your own coffee.',
        category: 'green-coffee',
        price: 16.99,
        images: ['https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&h=800&fit=crop'],
        origin: 'Ethiopia',
        stock: 55,
        grindOptions: [],
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

