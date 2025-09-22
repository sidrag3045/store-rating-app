const express = require('express');
const {protect} = require('../middlewares/auth.middleware');
const {updatePassword} = require('../controllers/user.controller');
const {updatePasswordSchema} = require('../validators/user.validators');
const router = express.Router();
const validate = require('../middlewares/validate.middleware');


// Health Check route (Base route)
router.get('/', (req, res) => {
    res.status(200).send('Base user api route is working fine');
});

// Update Password Route (PUT /api/users/password)
router.put('/password', protect, validate(updatePasswordSchema), updatePassword);

// Exporting the router
module.exports = router;