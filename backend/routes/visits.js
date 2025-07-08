const express = require('express');
const router = express.Router();
const Visit = require('../models/Visit');

// Create a new visit
router.post('/', async (req, res) => {
  try {
    const { userId, petId, date } = req.body;
    // Only allow one visit per pet per user per day
    const startOfDay = new Date(date);
    startOfDay.setHours(0,0,0,0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23,59,59,999);
    const existing = await Visit.findOne({
      userId,
      petId,
      date: { $gte: startOfDay, $lte: endOfDay }
    });
    if (existing) {
      return res.status(409).json({ error: 'You have already scheduled a visit for this pet on this day.' });
    }
    const visit = new Visit(req.body);
    await visit.save();
    res.status(201).json(visit);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all visits for a user
router.get('/:userId', async (req, res) => {
  try {
    const visits = await Visit.find({ userId: req.params.userId });
    res.json(visits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
