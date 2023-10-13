const ApiError = require('./ApiError');

class UnauthorizeError extends ApiError {
  /**
   * Error class for unauthorize error.
   * @param {String} msg error message
   */
  constructor(message = 'User needs to be authorized') {
    super(message);
    this.name = 'UnauthorizeError';
    this.status = 401;
  }
}

module.exports = UnauthorizeError;
