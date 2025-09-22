const Joi = require('joi');

// Schema for user registration
const registrationSchema = Joi.object({
  name: Joi.string().min(5).max(60).required(), 
  email: Joi.string().email().required(), 
  password: Joi.string()
    .min(8) 
    .max(16) 
    .required(),
  address: Joi.string().max(400).optional(),
});

// Schema for user login
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = {
  registrationSchema,
  loginSchema,
};