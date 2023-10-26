const Joi = require('joi');

const loginUserRequestSchema = Joi.object({
  email: Joi.string().email().trim().min(5).max(150).required(),
  password: Joi.string().trim().min(6).required(),
});

module.exports = loginUserRequestSchema;
