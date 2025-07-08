// Script to update all existing orders in MongoDB to ensure every item has an image field.
// Run this with: node scripts/add_default_images_to_orders.js

const mongoose = require('mongoose');
const Order = require('../models/Order');

const MONGO_URI = 'mongodb://localhost:27017/YOUR_DB_NAME'; // <-- Replace with your actual DB name

const defaultImages = {
  adoption: 'https://via.placeholder.com/150?text=Adopt+Me',
  care: 'https://via.placeholder.com/150?text=Pet+Care',
  accessory: 'https://via.placeholder.com/150?text=Accessory',
  appointment: 'https://via.placeholder.com/150?text=Clinic',
  default: 'https://via.placeholder.com/150?text=Pet+Order',
};

async function updateOrders() {
  await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  const orders = await Order.find();
  let updatedCount = 0;
  for (const order of orders) {
    let changed = false;
    order.items = order.items.map(item => {
      if (!item.image) {
        changed = true;
        const img = defaultImages[item.type] || defaultImages.default;
        return { ...item.toObject(), image: img };
      }
      return item;
    });
    if (changed) {
      await order.save();
      updatedCount++;
    }
  }
  console.log(`Updated ${updatedCount} orders with default images.`);
  mongoose.disconnect();
}

updateOrders().catch(err => {
  console.error(err);
  mongoose.disconnect();
});
