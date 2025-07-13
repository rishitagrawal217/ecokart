const mongoose = require('mongoose');

const ecoRewardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  ecoPointsCost: {
    type: Number,
    required: true
  },
  discountPercentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  maxDiscount: {
    type: Number,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  category: {
    type: String,
    enum: ['discount', 'free_shipping', 'cashback', 'donation', 'product'],
    default: 'discount'
  },
  tier: {
    type: String,
    enum: ['easy', 'mid', 'hard'],
    default: 'easy'
  },
  ecoFriendlyReason: {
    type: String,
    required: false
  },
  validFrom: {
    type: Date,
    default: Date.now
  },
  validUntil: {
    type: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('EcoReward', ecoRewardSchema); 