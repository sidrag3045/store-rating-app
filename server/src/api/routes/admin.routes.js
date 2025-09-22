const express = require('express');
const { protect, adminOnly } = require('../middlewares/auth.middleware');
const adminController = require('../controllers/admin.controller');
const { createUserSchema } = require('../validators/admin.validators');
const validate = require('../middlewares/validate.middleware');


const router = express.Router();

// All routes in this file are protected and for admins only
router.use(protect, adminOnly);

// Health Check route (Base route)
router.get('/', (req, res) => {
  res.status(200).send('Base admin api route is working fine');
});

// Route for the dashboard statistics (GET /api/admin/dashboard)
router.get('/dashboard', adminController.getDashboardStats);

// Route for admin to create a new user (POST /api/admin/users)
router.post('/users', validate(createUserSchema), adminController.createUser);

// Route for admin to get all users with filters (GET /api/admin/users)
router.get('/users', adminController.getAllUsers);

// Route for admin to get all stores with filters
router.get('/stores', adminController.getAllStores);

module.exports = router;
