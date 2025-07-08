const mongoose = require('mongoose');

const VisitSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  petId: { type: String, required: true },
  petName: { type: String, required: true },
  petImage: { type: String },
  time: { type: String, required: true },
  location: { type: String, required: true },
  status: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Visit', VisitSchema);
