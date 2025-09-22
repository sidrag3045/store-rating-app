const Joi = require('joi');

const validate = (schema) => (req, res, next) => {
  // Combine all request inputs to be validated
  const objectToValidate = {
    ...req.body,
    ...req.params,
    ...req.query
  };

  const { error } = schema.validate(objectToValidate);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  
  next();
};

module.exports = validate;