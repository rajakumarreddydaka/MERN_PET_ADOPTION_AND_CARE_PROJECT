require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error('MongoDB connection error:', err));

// Import routes
const orderRoutes = require('./routes/orders');
const petRoutes = require('./routes/pets');
const userRoutes = require('./routes/users');
const adoptionRoutes = require('./routes/adoptions');
const appointmentRoutes = require('./routes/appointments');
const visitRoutes = require('./routes/visits');

app.use('/api/orders', orderRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/users', userRoutes);
app.use('/api/adoptions', adoptionRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/visits', visitRoutes);

app.get('/', (req, res) => res.send('PetLove API Running!'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
