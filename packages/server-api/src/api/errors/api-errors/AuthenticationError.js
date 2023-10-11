const ApiError = require('./ApiError');

class AuthenticationError extends ApiError {
  /**
   * Error class for authentication error.
   * @param {String} msg error message
   */
  constructor(message = 'Invalid credentials') {
    super(message);
    this.name = 'AuthenticationError';
    this.status = 403;
  }
}

module.exports = AuthenticationError;
