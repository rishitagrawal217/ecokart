const mongoose = require('mongoose');
const Order = require('./models/Order');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ecokart', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function clearOrders() {
  try {
    console.log('Connected to MongoDB');
    
    // Clear all orders
    const result = await Order.deleteMany({});
    console.log(`Cleared ${result.deletedCount} orders from database`);
    
    console.log('Orders cleared successfully!');
  } catch (error) {
    console.error('Error clearing orders:', error);
  } finally {
    mongoose.connection.close();
  }
}

clearOrders(); 