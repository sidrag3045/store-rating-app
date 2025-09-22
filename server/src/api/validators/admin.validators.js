const Joi = require('joi');
const validate = require('../middlewares/validate.middleware');

const createUserSchema = Joi.object({
  name: Joi.string().min(3).max(60).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .max(16)
    .pattern(/^(?=.*[A-Z])(?=.*[!@#$&*])/)
    .required()
    .messages({
      'string.pattern.base': 'Password must contain one uppercase letter and one special character.',
    }),
  address: Joi.string().max(400).optional(),
  role: Joi.string().valid('admin', 'user', 'owner').required(),
});

module.exports = {
  validate,
  createUserSchema,
};