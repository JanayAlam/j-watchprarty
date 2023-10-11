const ApiError = require('./ApiError');

class NotFoundError extends ApiError {
  /**
   * error class for not found error
   * @param {String} msg Error message
   */
  constructor(message = 'Requested data not found') {
    super(message);
    this.name = 'NotFoundError';
    this.status = 404;
  }
}

module.exports = NotFoundError;
