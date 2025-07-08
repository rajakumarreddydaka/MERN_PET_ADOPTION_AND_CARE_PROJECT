require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// ✅ CORS configuration for frontend (Netlify domain)
app.use(cors({
  origin: 'https://petlovefrontend.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json()); // to parse JSON body

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Route imports
const orderRoutes = require('./routes/orders');
const petRoutes = require('./routes/pets');
const userRoutes = require('./routes/users');
const adoptionRoutes = require('./routes/adoptions');
const appointmentRoutes = require('./routes/appointments');
const visitRoutes = require('./routes/visits');

// ✅ API Routes
app.use('/api/orders', orderRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/users', userRoutes);
app.use('/api/adoptions', adoptionRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/visits', visitRoutes);

// ✅ Root route (health check)
app.get('/', (req, res) => {
  res.send('🎉 PetLove API is running!');
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
