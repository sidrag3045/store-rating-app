const Joi = require('joi');

const submitRatingSchema = Joi.object({
  storeId: Joi.string().uuid().required(),
  rating_value: Joi.number().integer().min(1).max(5).required(),
});

module.exports = {
  submitRatingSchema,
};