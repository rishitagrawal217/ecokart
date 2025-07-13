const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  isEcoAlternative: {
    type: Boolean,
    default: false
  },
  ecoPoints: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  }
});

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [orderItemSchema],
  subtotal: {
    type: Number,
    required: true
  },
  tax: {
    type: Number,
    required: true,
    default: 0
  },
  shipping: {
    type: Number,
    required: true,
    default: 0
  },
  total: {
    type: Number,
    required: true
  },
  ecoPointsEarned: {
    type: Number,
    required: true,
    default: 0
  },
  ecoPointsRedeemed: {
    type: Number,
    required: true,
    default: 0
  },
  finalTotal: {
    type: Number,
    required: true
  },
  // New fields for delivery and packaging options
  deliveryOption: {
    type: String,
    enum: ['standard', 'express'],
    default: 'standard'
  },
  ecoPackaging: {
    type: Boolean,
    default: false
  },
  deliveryEcoPoints: {
    type: Number,
    default: 0
  },
  packagingEcoPoints: {
    type: Number,
    default: 0
  },
  freeShippingApplied: {
    type: Boolean,
    default: false
  },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  orderDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema); 