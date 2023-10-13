const passport = require('passport');
const UnauthorizeError = require('../errors/api-errors/UnauthorizeError');

/**
 * Check if the user is authenticate or not.
 * @param {express.Request} req the request object provided by express
 * @param {express.Response} res the request object provided by express
 * @param {Function} next the request object provided by express
 * @throws UnauthorizeError
 * @returns void
 */
const isAuthenticated = (req, res, next) => {
  passport.authenticate('jwt', (err, user) => {
    if (err) return next(err);
    if (!user) throw new UnauthorizeError('Unauthorize access denied');
    req.user = user;
    return next();
  })(req, res, next);
};

module.exports = isAuthenticated;
