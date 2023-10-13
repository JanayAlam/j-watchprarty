const passportJWT = require('passport-jwt');
const models = require('../../models/data-models');

const { Strategy: JwtStrategy } = passportJWT;
const { ExtractJwt } = passportJWT;

const secretKey = process.env.JWT_SECRET || 'superman';

// the passport jwt strategy options.
const JWTOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey,
};

// configuring the passport js
const jwtStrategy = new JwtStrategy(JWTOptions, (JWTPayload, done) => {
  // finding the user from the database
  models.User.findOne({ id: JWTPayload.id }, (err, user) => {
    if (err || !user) {
      // invalid token
      return done(err, false);
    }
    // valid token
    return done(null, user);
  });
});

module.exports = jwtStrategy;
