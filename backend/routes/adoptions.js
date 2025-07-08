const express = require('express');
const router = express.Router();
const Adoption = require('../models/Adoption');

// Get all adoptions for a user
router.get('/:userId', async (req, res) => {
  try {
    const adoptions = await Adoption.find({ userId: req.params.userId });
    res.json(adoptions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Prevent duplicate adoption for the same user and pet
router.post('/', async (req, res) => {
  try {
    const { userId, petId } = req.body;
    const existing = await Adoption.findOne({ userId, petId });
    if (existing) {
      return res.status(409).json({ error: 'You have already adopted this pet.' });
    }
    const newAdoption = new Adoption(req.body);
    await newAdoption.save();
    res.status(201).json(newAdoption);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
