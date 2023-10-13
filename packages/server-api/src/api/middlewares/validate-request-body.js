const validate = require('../models/request-models/common');
const BadRequestError = require('../errors/api-errors/BadRequestError');

/**
 * Validate the request body.
 * @param {Joi.object} schema the Joi schema
 * @throws BadRequestError if request is not valid
 * @returns {Function} a middleware function
 */
const isValidBody = (schema) => (req, _res, next) => {
  // validating the provided schema with the validate function
  const result = validate(schema, req.body);
  if (result.error) {
    const messages = result.error.details.map((err) => err.message);
    const message = messages.join(', ');
    throw new BadRequestError(message);
  }
  // all okay
  next();
};

module.exports = isValidBody;
