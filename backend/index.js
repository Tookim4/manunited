const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const playerRoutes = require('./routes/playerRoutes');
const teamRoutes = require('./routes/teamRoutes');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,
}));

const PORT = process.env.PORT || 3000;

// Connect to database
connectDB();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import user routes
app.get('/', (req, res) => {
    res.send('Welcome to the Manchester United API');
});
app.use(userRoutes);
app.use(playerRoutes);
app.use('/team', teamRoutes);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});