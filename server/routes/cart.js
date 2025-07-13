const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const { auth } = require('../middleware/auth');

// Get user's cart
router.get('/', auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');
    
    if (!cart) {
      cart = new Cart({ userId: req.user._id, items: [] });
      await cart.save();
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add item to cart
router.post('/add', auth, async (req, res) => {
  try {
    const { productId, productName, isEcoAlternative, ecoPoints } = req.body;

    let cart = await Cart.findOne({ userId: req.user._id });
    
    if (!cart) {
      cart = new Cart({ userId: req.user._id, items: [] });
    }

    // Check if item already exists in cart
    const existingItem = cart.items.find(item => 
      item.productId.toString() === productId && 
      item.isEcoAlternative === isEcoAlternative
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({
        productId,
        productName,
        isEcoAlternative,
        ecoPoints,
        quantity: 1
      });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Remove item from cart
router.delete('/remove/:itemId', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item._id.toString() !== req.params.itemId);
    await cart.save();
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update item quantity
router.put('/update/:itemId', auth, async (req, res) => {
  try {
    const { quantity } = req.body;
    
    if (quantity < 1) {
      return res.status(400).json({ error: 'Quantity must be at least 1' });
    }

    const cart = await Cart.findOne({ userId: req.user._id });
    
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const item = cart.items.find(item => item._id.toString() === req.params.itemId);
    
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    item.quantity = quantity;
    await cart.save();
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Clear cart
router.delete('/clear', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    cart.items = [];
    await cart.save();
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 