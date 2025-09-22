const Joi = require('joi');

const createStoreSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  address: Joi.string().max(400).required(),
  owner_id: Joi.string().uuid().required().messages({ 
    'string.guid': 'Owner ID must be a valid UUID.'
  }),
});

module.exports = {
  createStoreSchema,
};