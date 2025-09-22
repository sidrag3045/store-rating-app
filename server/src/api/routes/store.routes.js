const express = require('express');
const { protect, adminOnly } = require('../middlewares/auth.middleware');
const {createStore, getAllStores} = require('../controllers/store.controller'); 
const { createStoreSchema } = require('../validators/store.validators');
const {submitRating} = require('../controllers/rating.controller');
const { submitRatingSchema } = require('../validators/rating.validators');
const validate = require('../middlewares/validate.middleware');

const router = express.Router();

// Health Check route (Base route)
router.get('/', (req, res) => {
  res.status(200).send('Base store api route is working fine');
});

// Create Store (POST /api/stores) --> Admin only
router.post(
  '/new',
  protect,
  adminOnly,
  validate(createStoreSchema), 
  createStore
);

// Get All Stores (GET /api/stores/all) --> Public
router.get('/all', protect, getAllStores);

// Submit Rating for a Store (POST /api/stores/:storeId/ratings) --> Protected
router.post(
  '/:storeId/ratings',
  protect,
  validate(submitRatingSchema),
  submitRating
);

module.exports = router;