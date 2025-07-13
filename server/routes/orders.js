const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const User = require('../models/User');
const Cart = require('../models/Cart');
const { auth } = require('../middleware/auth');

// Create new order (checkout)
router.post('/checkout', auth, async (req, res) => {
  try {
    const { 
      shippingAddress, 
      ecoPointsRedeemed = 0,
      deliveryOption = 'standard',
      ecoPackaging = false,
      freeShippingApplied: frontendFreeShipping = false,
      discountApplied = false,
      frontendFinalTotal = null
    } = req.body;
    
    // Get user's cart
    const cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Calculate totals
    let subtotal = 0;
    let ecoPointsEarned = 0;
    
    const orderItems = cart.items.map(item => {
      const product = item.productId;
      const price = item.isEcoAlternative ? 100 : 90; // Prices in rupees (₹100 for eco, ₹90 for non-eco)
      const ecoPoints = item.isEcoAlternative ? product.pointValue : 0;
      
      subtotal += price * item.quantity;
      ecoPointsEarned += ecoPoints * item.quantity;
      
      return {
        productId: product._id,
        productName: item.isEcoAlternative ? product.ecoAlternative : product.bestseller,
        isEcoAlternative: item.isEcoAlternative,
        ecoPoints: ecoPoints,
        price: price,
        quantity: item.quantity
      };
    });

    const tax = subtotal * 0.18; // 18% GST in India
    
    // Calculate shipping based on delivery option and free shipping reward
    let shipping = 0;
    let freeShippingApplied = false;
    
    // Check if free shipping was applied from frontend
    if (frontendFreeShipping) {
      shipping = 0; // Free shipping applied via reward
      freeShippingApplied = true;
    } else if (deliveryOption === 'express') {
      shipping = 999; // ₹999 for express
    } else {
      // Standard delivery - always ₹700
      shipping = 700;
    }
    
    const total = subtotal + tax + shipping;

    // Calculate additional EcoPoints from delivery and packaging
    let deliveryEcoPoints = 0;
    let packagingEcoPoints = 0;
    
    if (deliveryOption === 'standard') {
      deliveryEcoPoints = 10; // +10 EcoPoints for standard delivery
      ecoPointsEarned += deliveryEcoPoints;
    }
    
    if (ecoPackaging) {
      packagingEcoPoints = 5; // +5 EcoPoints for eco-friendly packaging
      ecoPointsEarned += packagingEcoPoints;
    }

    // Calculate discount from EcoPoints
    let discountAmount = 0;
    if (ecoPointsRedeemed > 0) {
      // Check if 10% discount was applied
      if (discountApplied) {
        discountAmount = Math.min(subtotal * 0.1, 2000); // 10% off subtotal up to ₹2000
      } else {
        // Regular EcoPoints redemption: 1 rupee per EcoPoint, but max 20% of total
        discountAmount = Math.min(ecoPointsRedeemed, total * 0.2);
      }
    }
    
    // Use frontend's final total directly
    const finalTotal = frontendFinalTotal;

    // Create order
    const order = new Order({
      userId: req.user.id,
      items: orderItems,
      subtotal,
      tax,
      shipping,
      total,
      ecoPointsEarned,
      ecoPointsRedeemed,
      finalTotal,
      deliveryOption,
      ecoPackaging,
      deliveryEcoPoints,
      packagingEcoPoints,
      shippingAddress,
      freeShippingApplied
    });

    await order.save();

    // Update user's EcoPoints
    const user = await User.findById(req.user.id);
    user.ecoPoints += ecoPointsEarned - ecoPointsRedeemed;
    await user.save();

    // Clear cart
    await Cart.findOneAndUpdate(
      { userId: req.user.id },
      { $set: { items: [] } }
    );

    res.json({
      message: 'Order placed successfully!',
      order: {
        id: order._id,
        total: finalTotal,
        ecoPointsEarned,
        deliveryEcoPoints,
        packagingEcoPoints,
        orderDate: order.orderDate
      }
    });

  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ message: 'Error processing checkout' });
  }
});

// Get user's orders
router.get('/my-orders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .sort({ orderDate: -1 })
      .populate('items.productId');
    
    res.json(orders);
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

// Get specific order
router.get('/:orderId', auth, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.orderId,
      userId: req.user.id
    }).populate('items.productId');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ message: 'Error fetching order' });
  }
});

// Cancel order
router.patch('/:orderId/cancel', auth, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.orderId,
      userId: req.user.id
    });
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    if (order.status !== 'pending') {
      return res.status(400).json({ message: 'Order cannot be cancelled' });
    }
    
    order.status = 'cancelled';
    await order.save();
    
    // Refund EcoPoints if any were redeemed
    if (order.ecoPointsRedeemed > 0) {
      const user = await User.findById(req.user.id);
      user.ecoPoints += order.ecoPointsRedeemed;
      await user.save();
    }
    
    res.json({ message: 'Order cancelled successfully' });
  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({ message: 'Error cancelling order' });
  }
});

module.exports = router; 