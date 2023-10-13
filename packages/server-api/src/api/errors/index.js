const ApiError = require('./api-errors/ApiError');
const InternalServerError = require('./api-errors/InternalServerError');
const NotFoundError = require('./api-errors/NotFoundError');

/**
 * Configure the error handling system of the whole application.
 * @param app the express application instance
 */
const configureErrorHandlers = (app) => {
  /**
   * When URL is not valid.
   * @param {Object} req the request object from express
   * @param {Object} _res the response object from express
   * @param {Function} next the next middleware function
   */
  app.use((req, _res, next) => {
    try {
      // except the documentation route
      if (!req.url.includes('api-docs')) {
        throw new NotFoundError('Requested URL is not valid');
      }
    } catch (error) {
      next(error);
    }
  });

  /**
   * Synchronous error handling.
   * @param {Error} err the instance of error class
   * @param {Object} _req the request object from express
   * @param {Object} res the next middleware function
   * @param {Function} _next the next middleware function
   */
  /* eslint no-unused-vars: 0 */
  app.use((err, _req, res, _next) => {
    // storing the parameter variable `err` variable in a local variable
    let errorObj = err;
    // assuming the error status code is 500
    let code = 500;
    // checking if the error is known or unknown
    if (errorObj instanceof ApiError) {
      // getting the actual error code
      code = err.status;
    } else {
      // error is unhandled
      errorObj = new InternalServerError(err.message || 'Something went wrong');
    }
    // returning the error to the user
    res.status(code).json({
      name: err.name,
      message: err.message,
    });
  });
};

module.exports = configureErrorHandlers;
