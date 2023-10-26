const passportJWT = require('passport-jwt');
const UnauthorizeError = require('../../errors/api-errors/UnauthorizeError');
const { User } = require('../../models/data-models');

const { Strategy: JwtStrategy } = passportJWT;
const { ExtractJwt } = passportJWT;

const secretKey = process.env.JWT_SECRET || 'superman';

// the passport jwt strategy options.
const JWTOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey,
};

// configuring the passport js
const jwtStrategy = new JwtStrategy(JWTOptions, async (JWTPayload, done) => {
  // finding the user from the database
  try {
    const user = await User.findById(JWTPayload.id);
    if (!user) {
      throw new UnauthorizeError('Invalid token');
    }
    // valid token
    return done(null, user);
  } catch (err) {
    // invalid token
    return done(err, false);
  }
});

module.exports = jwtStrategy;
