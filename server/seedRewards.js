const mongoose = require('mongoose');
const EcoReward = require('./models/EcoReward');
const dotenv = require('dotenv');

dotenv.config();

const rewards = [
  // Easy Tier (100-300 EcoPoints)
  {
    name: "Organic Cotton Tote Bag",
    description: "Reusable, biodegradable shopping bag - great for replacing plastic bags",
    ecoPointsCost: 150,
    discountPercentage: 0,
    maxDiscount: 0,
    category: "product",
    tier: "easy",
    ecoFriendlyReason: "Reusable, biodegradable, great for replacing plastic bags"
  },
  {
    name: "Eco-Friendly Cup (Bamboo/Recycled Plastic)",
    description: "Helps avoid single-use coffee cups and reduce waste",
    ecoPointsCost: 200,
    discountPercentage: 0,
    maxDiscount: 0,
    category: "product",
    tier: "easy",
    ecoFriendlyReason: "Helps avoid single-use coffee cups"
  },
  {
    name: "Plantable Seed Pencils",
    description: "Grows into herbs or flowers after use – zero waste writing tool",
    ecoPointsCost: 100,
    discountPercentage: 0,
    maxDiscount: 0,
    category: "product",
    tier: "easy",
    ecoFriendlyReason: "Grows into herbs or flowers after use – zero waste"
  },
  
  // Mid Tier (400-800 EcoPoints)
  {
    name: "Reusable Cutlery Kit (Bamboo/Steel)",
    description: "Portable cutlery set that replaces disposable forks and spoons",
    ecoPointsCost: 500,
    discountPercentage: 0,
    maxDiscount: 0,
    category: "product",
    tier: "mid",
    ecoFriendlyReason: "Portable, replaces disposable forks/spoons"
  },
  {
    name: "Silicone Food Storage Bags (Set of 3)",
    description: "Replaces Ziploc bags — dishwasher safe and reusable",
    ecoPointsCost: 600,
    discountPercentage: 0,
    maxDiscount: 0,
    category: "product",
    tier: "mid",
    ecoFriendlyReason: "Replaces Ziploc bags — dishwasher safe, reusable"
  },
  {
    name: "Solar-Powered Keychain Light",
    description: "Clean energy gadget that eliminates battery waste",
    ecoPointsCost: 400,
    discountPercentage: 0,
    maxDiscount: 0,
    category: "product",
    tier: "mid",
    ecoFriendlyReason: "Clean energy gadget, no battery waste"
  },
  
  // Hard Tier (900-2000+ EcoPoints)
  {
    name: "Stainless Steel Water Bottle",
    description: "Premium reusable water bottle (like Klean Kanteen) - reusable for life",
    ecoPointsCost: 1200,
    discountPercentage: 0,
    maxDiscount: 0,
    category: "product",
    tier: "hard",
    ecoFriendlyReason: "Reusable for life, reduces plastic waste massively"
  },
  {
    name: "Eco-Friendly Skincare Kit",
    description: "Glass packaging with clean ingredients - replaces plastic-heavy cosmetics",
    ecoPointsCost: 1500,
    discountPercentage: 0,
    maxDiscount: 0,
    category: "product",
    tier: "hard",
    ecoFriendlyReason: "Replaces typical plastic-heavy cosmetics"
  },
  {
    name: "Natural Deodorant",
    description: "Plastic-free + toxin-free personal care in compostable or glass container",
    ecoPointsCost: 900,
    discountPercentage: 0,
    maxDiscount: 0,
    category: "product",
    tier: "hard",
    ecoFriendlyReason: "Plastic-free + toxin-free personal care upgrade"
  },
  
  // Keep some original discount rewards
  {
    name: "10% Off This Order",
    description: "Get 10% off this purchase up to ₹2000",
    ecoPointsCost: 100,
    discountPercentage: 10,
    maxDiscount: 2000,
    category: "discount",
    tier: "easy"
  },
  {
    name: "Free Shipping",
    description: "Free shipping on this order",
    ecoPointsCost: 50,
    discountPercentage: 100,
    maxDiscount: 1000,
    category: "free_shipping",
    tier: "easy"
  },
  {
    name: "15% Off Eco Products",
    description: "Get 15% off all eco-friendly products",
    ecoPointsCost: 200,
    discountPercentage: 15,
    maxDiscount: 3000,
    category: "discount",
    tier: "mid"
  },
  {
    name: "Plant a Tree",
    description: "We'll plant a tree in your name",
    ecoPointsCost: 75,
    discountPercentage: 0,
    maxDiscount: 0,
    category: "donation",
    tier: "easy"
  }
];

const mongoUri = process.env.MONGO_URI || 'mongodb+srv://rishitagrawal217:t6ddr0l6cOyXxxml@cluster0.actbcon.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('MongoDB connected');
    
    // Clear existing rewards
    await EcoReward.deleteMany({});
    console.log('Cleared existing rewards');
    
    // Insert new rewards
    await EcoReward.insertMany(rewards);
    console.log('Rewards seeded successfully!');
    
    // Display seeded rewards by tier
    const easyRewards = await EcoReward.find({ tier: 'easy' }).sort({ ecoPointsCost: 1 });
    const midRewards = await EcoReward.find({ tier: 'mid' }).sort({ ecoPointsCost: 1 });
    const hardRewards = await EcoReward.find({ tier: 'hard' }).sort({ ecoPointsCost: 1 });
    
    console.log('\n🟢 Easy Tier Rewards (100-300 EcoPoints):');
    easyRewards.forEach(reward => {
      console.log(`- ${reward.name}: ${reward.ecoPointsCost} EcoPoints`);
    });
    
    console.log('\n🟡 Mid Tier Rewards (400-800 EcoPoints):');
    midRewards.forEach(reward => {
      console.log(`- ${reward.name}: ${reward.ecoPointsCost} EcoPoints`);
    });
    
    console.log('\n🔵 Hard Tier Rewards (900-2000+ EcoPoints):');
    hardRewards.forEach(reward => {
      console.log(`- ${reward.name}: ${reward.ecoPointsCost} EcoPoints`);
    });
    
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error seeding rewards:', err);
    mongoose.connection.close();
  }); 