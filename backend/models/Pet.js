const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
  name: String,
  breed: String,
  type: String,
  age: Number,
  location: String,
  image: String,
  description: String,
  isAvailable: Boolean,
  gender: String,
  size: String
});

module.exports = mongoose.model('Pet', PetSchema);
