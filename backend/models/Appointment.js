const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  clinicId: { type: String, required: true },
  clinicName: String,
  clinicAddress: String,
  petId: String,
  petName: String,
  petImage: String,
  date: Date,
  time: String,
  reason: String,
  status: String
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
