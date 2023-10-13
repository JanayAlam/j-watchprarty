const ApiError = require('./ApiError');

class InternalServerError extends ApiError {
  /**
   * Error class for internal server error.
   * @param {String} msg error message
   */
  constructor(message = 'Something went wrong') {
    super(message);
    this.name = 'InternalServerError';
    this.status = 500;
  }
}

module.exports = InternalServerError;
