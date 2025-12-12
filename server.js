const express = require('express');
const path = require('path');
require('dotenv').config();
const connectDB = require('./config/database');
const Order = require('./models/Order');
const Product = require('./models/Product');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static('public'));

// Serve index.html for root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API Routes

/**
 * POST /api/checkout
 * Create a new order from cart checkout
 */
app.post('/api/checkout', async (req, res) => {
  try {
    const { customerInfo, items, subtotal, shipping, tax, total, paymentMethod } = req.body;

    // Validate required fields
    if (!customerInfo || !items || items.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields: customerInfo and items are required' 
      });
    }

    // Find or create user for the order
    let user;
    try {
      user = await User.findOne({ email: customerInfo.email });
      
      if (!user) {
        // Create a user account from checkout info
        user = await User.create({
          name: customerInfo.name,
          email: customerInfo.email,
          password: 'guest-' + Math.random().toString(36).substring(7), // Temporary password
          role: 'customer',
          addresses: [{
            street: customerInfo.street,
            city: customerInfo.city,
            state: customerInfo.state,
            zipCode: customerInfo.zipCode,
            country: customerInfo.country || 'USA'
          }]
        });
      } else {
        // Update user address if new
        const addressExists = user.addresses.some(addr => 
          addr.street === customerInfo.street && 
          addr.city === customerInfo.city
        );
        if (!addressExists) {
          user.addresses.push({
            street: customerInfo.street,
            city: customerInfo.city,
            state: customerInfo.state,
            zipCode: customerInfo.zipCode,
            country: customerInfo.country || 'USA'
          });
          await user.save();
        }
      }
    } catch (error) {
      console.error('User creation/retrieval error:', error);
      return res.status(500).json({
        success: false,
        message: 'Error creating user account: ' + error.message
      });
    }

    // Map items to order items format
    // Try to find products by name, or use a default product ID
    const orderItems = [];
    for (const item of items) {
      try {
        // Try to find product by name (matching our seed data)
        let product = await Product.findOne({ name: item.name });
        
        // If product not found, we'll need to handle this
        // For now, we'll use the first product as a fallback (for demo purposes)
        // In production, you'd want to create the product or use a proper mapping
        if (!product) {
          product = await Product.findOne(); // Fallback to any product
        }
        
        orderItems.push({
          product: product ? product._id : null,
          quantity: item.quantity,
          price: item.price,
          grindOption: item.grindOption || undefined
        });
      } catch (error) {
        console.error(`Error processing item ${item.name}:`, error);
        // Continue with other items
      }
    }
    
    if (orderItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No valid items in cart'
      });
    }

    // Create the order
    const order = await Order.create({
      user: user._id, // Now guaranteed to exist
      items: orderItems,
      subtotal: subtotal || 0,
      shipping: shipping || 0,
      tax: tax || 0,
      total: total || 0,
      shippingAddress: {
        street: customerInfo.street,
        city: customerInfo.city,
        state: customerInfo.state,
        zipCode: customerInfo.zipCode,
        country: customerInfo.country || 'USA'
      },
      status: 'pending',
      paymentMethod: paymentMethod || 'credit-card'
    });

    // Update product stock (if products exist in database)
    for (const item of items) {
      try {
        const product = await Product.findOne({ name: item.name });
        if (product && product.stock >= item.quantity) {
          product.stock -= item.quantity;
          await product.save();
        }
      } catch (error) {
        console.error(`Error updating stock for product ${item.name}:`, error);
        // Continue even if stock update fails
      }
    }

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      orderId: order._id,
      order: order
    });

  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing checkout: ' + error.message
    });
  }
});

/**
 * GET /api/orders/:orderId
 * Get order details by ID
 */
app.get('/api/orders/:orderId', async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate('user', 'name email')
      .populate('items.product', 'name price images');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      order: order
    });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving order: ' + error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

