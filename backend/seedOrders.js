require('dotenv').config();
const mongoose = require('mongoose');
const Order = require('./models/Order');

const MONGODB_URI = process.env.MONGODB_URI;

const testOrder = {
  userId: 'testuser',
  items: [
    {
      productId: 'p1',
      name: 'Test Product',
      price: 100,
      quantity: 1,
      image: 'test.jpg',
    }
  ],
  total: 100,
  status: 'pending',
};

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await Order.create(testOrder);
    console.log('Test order inserted!');
    await mongoose.disconnect();
  } catch (err) {
    console.error('Error inserting test order:', err);
    process.exit(1);
  }
}

seed();
