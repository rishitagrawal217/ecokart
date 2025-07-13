const express = require('express');
const router = express.Router();
const EcoReward = require('../models/EcoReward');
const Redemption = require('../models/Redemption');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

// Get all available rewards
router.get('/rewards', auth, async (req, res) => {
  try {
    const rewards = await EcoReward.find({ 
      isActive: true,
      $or: [
        { validUntil: { $gt: new Date() } },
        { validUntil: null }
      ]
    });
    
    res.json(rewards);
  } catch (error) {
    console.error('Get rewards error:', error);
    res.status(500).json({ message: 'Error fetching rewards' });
  }
});

// Get user's redemptions
router.get('/my-redemptions', auth, async (req, res) => {
  try {
    const redemptions = await Redemption.find({ userId: req.user.id })
      .populate('rewardId')
      .sort({ redeemedAt: -1 });
    
    res.json(redemptions);
  } catch (error) {
    console.error('Get redemptions error:', error);
    res.status(500).json({ message: 'Error fetching redemptions' });
  }
});

// Redeem EcoPoints for a reward
router.post('/redeem', auth, async (req, res) => {
  try {
    const { rewardId } = req.body;
    
    // Get the reward
    const reward = await EcoReward.findById(rewardId);
    if (!reward || !reward.isActive) {
      return res.status(404).json({ message: 'Reward not found or inactive' });
    }
    
    // Check if reward is still valid
    if (reward.validUntil && reward.validUntil < new Date()) {
      return res.status(400).json({ message: 'Reward has expired' });
    }
    
    // Get user
    const user = await User.findById(req.user.id);
    if (user.ecoPoints < reward.ecoPointsCost) {
      return res.status(400).json({ 
        message: `Insufficient EcoPoints. You have ${user.ecoPoints}, need ${reward.ecoPointsCost}` 
      });
    }
    
    // Calculate discount amount
    const discountAmount = Math.min(
      reward.discountPercentage / 100 * 100, // Example: 10% off $100 order
      reward.maxDiscount
    );
    
    // Create redemption
    const redemption = new Redemption({
      userId: req.user.id,
      rewardId: reward._id,
      ecoPointsSpent: reward.ecoPointsCost,
      discountAmount: discountAmount,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
    });
    
    await redemption.save();
    
    // Deduct EcoPoints from user
    user.ecoPoints -= reward.ecoPointsCost;
    await user.save();
    
    res.json({
      message: 'Reward redeemed successfully!',
      redemption: {
        id: redemption._id,
        rewardName: reward.name,
        ecoPointsSpent: reward.ecoPointsCost,
        discountAmount: discountAmount,
        expiresAt: redemption.expiresAt
      },
      remainingEcoPoints: user.ecoPoints
    });
    
  } catch (error) {
    console.error('Redeem error:', error);
    res.status(500).json({ message: 'Error redeeming reward' });
  }
});

// Get user's EcoPoints balance
router.get('/balance', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ ecoPoints: user.ecoPoints });
  } catch (error) {
    console.error('Get balance error:', error);
    res.status(500).json({ message: 'Error fetching balance' });
  }
});

// Get EcoPoints history (earned from orders)
router.get('/history', auth, async (req, res) => {
  try {
    const Order = require('../models/Order');
    const orders = await Order.find({ 
      userId: req.user.id,
      ecoPointsEarned: { $gt: 0 }
    })
    .select('orderDate ecoPointsEarned total')
    .sort({ orderDate: -1 })
    .limit(10);
    
    res.json(orders);
  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({ message: 'Error fetching history' });
  }
});

// Admin: Create new reward (for testing)
router.post('/admin/rewards', async (req, res) => {
  try {
    const { name, description, ecoPointsCost, discountPercentage, maxDiscount, category } = req.body;
    
    const reward = new EcoReward({
      name,
      description,
      ecoPointsCost,
      discountPercentage,
      maxDiscount,
      category: category || 'discount'
    });
    
    await reward.save();
    res.json({ message: 'Reward created successfully', reward });
  } catch (error) {
    console.error('Create reward error:', error);
    res.status(500).json({ message: 'Error creating reward' });
  }
});

module.exports = router; 