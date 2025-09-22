const ratingService = require('../services/rating.service');

const submitRating = async (req, res, next) => {
  try {
    const { storeId } = req.params;
    const { rating_value } = req.body;
    const userId = req.user.id; // From the 'protect' middleware

    const { rating, created } = await ratingService.submitRating(userId, storeId, rating_value);

    // Sending a different status code based on whether the rating was created or updated
    const statusCode = created ? 201 : 200;
    const message = created ? 'Rating submitted successfully' : 'Rating updated successfully';

    res.status(statusCode).json({ message, rating });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitRating
};