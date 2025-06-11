const Joi = require('joi');

const contactValidationSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).required(),
  number: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      'string.pattern.base': 'Phone number must be 10 digits',
    }),
});

module.exports = { contactValidationSchema };
