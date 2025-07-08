const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all orders for a user
router.get('/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new order
router.post('/', async (req, res) => {
  try {
    // Ensure every item has an image, using defaults by type
if (Array.isArray(req.body.items)) {
  req.body.items = req.body.items.map(item => {
    if (!item.image) {
      let defaultImage = 'https://via.placeholder.com/150?text=Pet+Order';
      if (item.type === 'adoption') defaultImage = 'https://via.placeholder.com/150?text=Adopt+Me';
      else if (item.type === 'care') defaultImage = 'https://via.placeholder.com/150?text=Pet+Care';
      else if (item.type === 'accessory') defaultImage = 'https://via.placeholder.com/150?text=Accessory';
      else if (item.type === 'appointment') defaultImage = 'https://via.placeholder.com/150?text=Clinic';
      return { ...item, image: defaultImage };
    }
    return item;
  });
}
const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
