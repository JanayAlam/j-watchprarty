const Joi = require('joi');

const registerUserRequestSchema = Joi.object({
  firstName: Joi.string().trim().min(2).max(30).required(),
  lastName: Joi.string().trim().min(2).max(30).required(),
  email: Joi.string().email().trim().min(5).max(150).required(),
  password: Joi.string().trim().min(6).required(),
  confirmPassword: Joi.string()
    .trim()
    .min(6)
    .required()
    .equal(Joi.ref('password'))
    .label('confirmPassword')
    .options({
      messages: {
        'any.only': '{{#label}} does not match',
      },
    }),
});

module.exports = registerUserRequestSchema;
