const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./config/db');

const app = express();

// Connect to database
connectDB();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import user routes
app.use(userRoutes);


//connect to the database
// const DB = process.env.MONGO_URI;
// mongoose.connect(DB)
// .then(() => {
//     console.log('DB connected');
//     app.listen(process.env.PORT || 3000, () =>
//         console.log('Server is running on port', process.env.PORT || 3000)
//     );
// })
// .catch((err) => {
//     console.log('DB connection error:', err);
// });


// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });