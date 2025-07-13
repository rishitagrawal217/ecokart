const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  category: { type: String, required: true },
  bestseller: { type: String, required: true },
  ecoAlternative: { type: String, required: true },
  pointValue: { type: Number, required: true },
  ecoPrice: { type: Number, required: true, default: 10000 }, // ₹100 in paise
  bestsellerPrice: { type: Number, required: true, default: 9000 }, // ₹90 in paise
  bestsellerImage: { type: String, required: true },
  ecoImage: { type: String, required: true }
});

module.exports = mongoose.model('Product', productSchema); 