const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a product name'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  category: {
    type: String,
    enum: ['roasted-coffee', 'green-coffee', 'specialty-blend', 'energy-drink'],
    required: true,
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
    min: 0,
  },
  images: [{
    type: String,
  }],
  origin: {
    type: String,
  },
  roastLevel: {
    type: String,
    enum: ['light', 'medium', 'dark'],
  },
  flavorProfile: [{
    type: String,
  }],
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  grindOptions: [{
    type: String,
    enum: ['whole-bean', 'coarse', 'medium', 'fine', 'espresso'],
  }],
  featured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Product', productSchema);

