const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const {registrationSchema, loginSchema,} = require('../validators/auth.validators');
const validate = require('../middlewares/validate.middleware');
const {protect} = require('../middlewares/auth.middleware');


// Health Check route (Base route)
router.get('/', (req, res) => {
    res.status(200).send('Base auth api route is working fine');
});

// Register Route (POST /api/auth/register)
router.post('/register', validate(registrationSchema), authController.register);

// Login Route (POST /api/auth/login)
router.post('/login', validate(loginSchema), authController.login);

// Route to get the currently logged-in user's profile
router.get('/profile', protect, authController.getProfile);

// Logout Route (POST /api/auth/logout)
router.post('/logout', authController.logout);


// Exporting the router
module.exports = router;

