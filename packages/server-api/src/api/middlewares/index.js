const validateBody = require('./validate-request-body');
const isAuthenticated = require('./is-authenticated');
const isValidId = require('./is-valid-id');

module.exports = {
  isAuthenticated,
  isValidId,
  validateBody,
};
