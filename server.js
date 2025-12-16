const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('./config/database');
const Order = require('./models/Order');
const Product = require('./models/Product');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Connect to MongoDB (non-blocking)
let dbConnected = false;
connectDB().then(connected => {
  dbConnected = connected;
}).catch(err => {
  console.error('Database connection failed:', err);
  dbConnected = false;
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware (for API requests)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// JWT Authentication Middleware
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token. User not found.'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token.'
    });
  }
};

// Serve static files from public directory
app.use(express.static('public'));

// Serve index.html for root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve account.html
app.get('/account.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'account.html'));
});

// API Routes

/**
 * POST /api/auth/register
 * Register a new user
 */
app.post('/api/auth/register', async (req, res) => {
  // Check database connection
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      message: 'Database connection unavailable. Please check your MongoDB Atlas IP whitelist settings.'
    });
  }

  try {
    const { name, email, password, confirmPassword } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Create new user (password will be hashed by pre-save hook)
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: password,
      role: 'customer'
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle duplicate email error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error registering user: ' + error.message
    });
  }
});

/**
 * POST /api/auth/login
 * Login user
 */
app.post('/api/auth/login', async (req, res) => {
  // Check database connection
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      message: 'Database connection unavailable. Please check your MongoDB Atlas IP whitelist settings.'
    });
  }

  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Find user and include password field
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Error logging in: ' + error.message
    });
  }
});

/**
 * GET /api/auth/me
 * Get current user info (protected route)
 */
app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        addresses: user.addresses || []
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving user: ' + error.message
    });
  }
});

/**
 * PUT /api/auth/me
 * Update current user info (protected route)
 */
app.put('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    const { name, email, addresses } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update fields if provided
    if (name) user.name = name.trim();
    if (email) {
      // Check if email is already taken by another user
      const existingUser = await User.findOne({ 
        email: email.toLowerCase().trim(),
        _id: { $ne: user._id }
      });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Email is already taken by another account'
        });
      }
      user.email = email.toLowerCase().trim();
    }
    if (addresses && Array.isArray(addresses)) {
      user.addresses = addresses;
    }

    await user.save();

    res.json({
      success: true,
      message: 'User information updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        addresses: user.addresses
      }
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating user: ' + error.message
    });
  }
});

/**
 * POST /api/auth/change-password
 * Change user password (protected route)
 */
app.post('/api/auth/change-password', authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Validation
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both current and new password'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters long'
      });
    }

    // Find user with password field
    const user = await User.findById(req.user._id).select('+password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Verify current password
    const isPasswordValid = await user.comparePassword(currentPassword);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Update password (will be hashed by pre-save hook)
    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Error changing password: ' + error.message
    });
  }
});

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

