const express = require("express");
const cors = require("cors");
const connectDB = require('./config/db.js');
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/AuthRoutes.js');

dotenv.config(); 
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
const passport = require("passport");

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: [
    process.env.CLIENT_URL, 
    'http://localhost:5173' 
  ],
  credentials: true
}));

app.use(passport.initialize());
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

// Routes API
app.use('/api/auth', authRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Production: ${process.env.CLIENT_URL}`);
});

