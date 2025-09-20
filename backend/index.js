const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const path = require('path')

const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const playerRoutes = require('./routes/playerRoutes');
const teamRoutes = require('./routes/teamRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Connect to database first
connectDB();

// 2. Global middleware
app.use(cors({
  origin: 'https://manunited-ebon.vercel.app',
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Manchester United API');
});
app.use('/users', userRoutes);   
app.use('/players', playerRoutes);
app.use('/team', teamRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 4. Catch-all for unknown routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// 5. Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
