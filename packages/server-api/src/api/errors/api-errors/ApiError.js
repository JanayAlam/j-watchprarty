class ApiError extends Error {
  /**
   * Constructor of ApiError class.
   * @param {string} msg error message
   */
  constructor(message) {
    super(message);
    this.message = message;
    this.name = 'ApiError';
    this.status = 500;
  }
}

module.exports = ApiError;
