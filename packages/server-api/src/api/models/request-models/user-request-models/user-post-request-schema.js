const Joi = require('joi');

const userPostRequestSchema = Joi.object({
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

module.exports = userPostRequestSchema;
