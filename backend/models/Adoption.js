const mongoose = require('mongoose');

const AdoptionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  petId: { type: String, required: true },
  petName: String,
  petImage: String,
  petBreed: String,
  petType: String,
  petGender: String,
  petAge: Number,
  petSize: String,
  petLocation: String,
  petDescription: String,
  date: { type: Date, default: Date.now },
  status: String
});

module.exports = mongoose.model('Adoption', AdoptionSchema);
