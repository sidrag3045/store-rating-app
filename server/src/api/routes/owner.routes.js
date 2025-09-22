const express = require('express');
const { protect, ownerOnly } = require('../middlewares/auth.middleware');
const ownerController = require('../controllers/owner.controller');

const router = express.Router();

// This route is protected and only accessible to users with the 'owner' role
// GET /api/owner/dashboard - Getting dashboard data for store owners
router.get('/dashboard', protect, ownerOnly, ownerController.getDashboardData);

module.exports = router;