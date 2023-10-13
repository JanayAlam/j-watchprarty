const ApiError = require('./ApiError');

class BadRequestError extends ApiError {
  /**
   * Error class for user's bad request.
   * @param {string} msg Error message
   */
  constructor(message = 'Some fields are required') {
    super(message);
    this.name = 'BadRequestError';
    this.status = 400;
  }
}

module.exports = BadRequestError;
