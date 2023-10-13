const isValidMongooseId = require('../utils/check-objectid-validity');
const BadRequestError = require('../errors/api-errors/BadRequestError');

/**
 * Check validity of a object id.
 * @param {express.Request} req the request object from express
 * @param {express.Response} _res the response object from express
 * @param {Function} next the next middleware function
 */
const isValidId = (req, _res, next) => {
  // getting id from the uri parameter
  const { id } = req.params;
  const result = isValidMongooseId(id);
  if (!result) throw new BadRequestError('Please provide a valid mongoose id');
  return next();
};

module.exports = isValidId;
