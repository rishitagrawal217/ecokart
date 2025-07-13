const mongoose = require('mongoose');

const redemptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rewardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EcoReward',
    required: true
  },
  ecoPointsSpent: {
    type: Number,
    required: true
  },
  discountAmount: {
    type: Number,
    required: true
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  },
  status: {
    type: String,
    enum: ['active', 'used', 'expired'],
    default: 'active'
  },
  redeemedAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Redemption', redemptionSchema); 