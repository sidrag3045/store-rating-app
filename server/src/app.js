const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
// const errorHandler = require('./middlewares/errorHandler');

// Initializing Express app
const app = express();

// Loading env vars
dotenv.config();

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173', // Allows all origins. For production, you'd list your frontend's URL.
  credentials: true, // Allowing cookies to be sent
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Specify allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
}));

app.use(cookieParser());
app.use(express.json());

// Health check route (Base route)
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Importing routes
const authRoutes = require('./api/routes/auth.routes');
const userRoutes = require('./api/routes/user.routes');
const storeRoutes = require('./api/routes/store.routes');
const ownerRoutes = require('./api/routes/owner.routes');
const adminRoutes = require('./api/routes/admin.routes');

// Using routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/owner', ownerRoutes);
app.use('/api/admin', adminRoutes);

// Basic 404 - Not Found handler
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

// Error handling middleware
// app.use(errorHandler);

// Export app can be used by server.js or other modules. Also for testing purposes
module.exports = app;
