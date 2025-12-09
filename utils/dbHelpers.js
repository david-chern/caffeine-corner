const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

/**
 * Database helper functions for common operations
 */

// User helpers
const userHelpers = {
  /**
   * Find user by email
   */
  findByEmail: async (email) => {
    return await User.findOne({ email: email.toLowerCase() });
  },

  /**
   * Find user by ID
   */
  findById: async (id) => {
    return await User.findById(id);
  },

  /**
   * Create new user
   */
  create: async (userData) => {
    const user = new User(userData);
    return await user.save();
  },

  /**
   * Get all users
   */
  findAll: async () => {
    return await User.find().select('-password');
  }
};

// Product helpers
const productHelpers = {
  /**
   * Find all products with optional filters
   */
  findAll: async (filters = {}) => {
    const query = {};
    
    if (filters.category) {
      query.category = filters.category;
    }
    
    if (filters.roastLevel) {
      query.roastLevel = filters.roastLevel;
    }
    
    if (filters.featured !== undefined) {
      query.featured = filters.featured;
    }
    
    if (filters.minPrice || filters.maxPrice) {
      query.price = {};
      if (filters.minPrice) query.price.$gte = filters.minPrice;
      if (filters.maxPrice) query.price.$lte = filters.maxPrice;
    }
    
    return await Product.find(query).sort({ createdAt: -1 });
  },

  /**
   * Find product by ID
   */
  findById: async (id) => {
    return await Product.findById(id);
  },

  /**
   * Create new product
   */
  create: async (productData) => {
    const product = new Product(productData);
    return await product.save();
  },

  /**
   * Update product stock
   */
  updateStock: async (id, quantity) => {
    return await Product.findByIdAndUpdate(
      id,
      { $inc: { stock: quantity } },
      { new: true }
    );
  },

  /**
   * Get featured products
   */
  getFeatured: async () => {
    return await Product.find({ featured: true }).limit(6);
  },

  /**
   * Search products by name or description
   */
  search: async (searchTerm) => {
    return await Product.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } }
      ]
    });
  }
};

// Order helpers
const orderHelpers = {
  /**
   * Find all orders
   */
  findAll: async (filters = {}) => {
    const query = {};
    
    if (filters.userId) {
      query.user = filters.userId;
    }
    
    if (filters.status) {
      query.status = filters.status;
    }
    
    return await Order.find(query)
      .populate('user', 'name email')
      .populate('items.product', 'name price images')
      .sort({ createdAt: -1 });
  },

  /**
   * Find order by ID
   */
  findById: async (id) => {
    return await Order.findById(id)
      .populate('user', 'name email')
      .populate('items.product', 'name price images');
  },

  /**
   * Create new order
   */
  create: async (orderData) => {
    // Calculate totals
    let subtotal = 0;
    orderData.items.forEach(item => {
      subtotal += item.price * item.quantity;
    });
    
    const shipping = orderData.shipping || 0;
    const tax = orderData.tax || (subtotal + shipping) * 0.1;
    const total = subtotal + shipping + tax;
    
    const order = new Order({
      ...orderData,
      subtotal,
      tax,
      total
    });
    
    // Update product stock
    for (const item of orderData.items) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { stock: -item.quantity } }
      );
    }
    
    return await order.save();
  },

  /**
   * Update order status
   */
  updateStatus: async (id, status) => {
    return await Order.findByIdAndUpdate(
      id,
      { status, updatedAt: new Date() },
      { new: true }
    );
  },

  /**
   * Get orders by user
   */
  findByUser: async (userId) => {
    return await Order.find({ user: userId })
      .populate('items.product', 'name price images')
      .sort({ createdAt: -1 });
  }
};

module.exports = {
  user: userHelpers,
  product: productHelpers,
  order: orderHelpers
};

