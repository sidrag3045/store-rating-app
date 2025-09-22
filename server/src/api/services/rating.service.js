const { Rating } = require('../../database/models');

const submitRating = async (userId, storeId, ratingValue) => {
  // Step 1: Find an existing rating for this user and store
  const existingRating = await Rating.findOne({
    where: {
      user_id: userId,
      store_id: storeId,
    }
  });

  // Step 2: Check if a rating was found
  if (existingRating) {
    // If it exists, update it and we know it was NOT newly created
    existingRating.rating_value = ratingValue;
    const updatedRating = await existingRating.save();
    return { rating: updatedRating, created: false };
  } else {
    // If it does not exist, create it and we know it WAS newly created
    const newRating = await Rating.create({
      user_id: userId,
      store_id: storeId,
      rating_value: ratingValue,
    });
    return { rating: newRating, created: true };
  }
};

module.exports = {
  submitRating
};