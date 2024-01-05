const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  store: storeUser,
  remove: removeUser,
  _getUserRawObjectByEmail,
} = require('../services/user-service');
const { get: getProfileByProperties } = require('../services/profile-service');
const { store: storeProfile } = require('../services/profile-service');
const NotFoundError = require('../errors/api-errors/NotFoundError');
const UnauthorizeError = require('../errors/api-errors/UnauthorizeError');
const InternalServerError = require('../errors/api-errors/InternalServerError');
const { UserResponseModel } = require('../models/response-models');

const register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  let user = null;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await storeUser({ email, password: hashedPassword });
  } catch (err) {
    return next(err);
  }

  try {
    await storeProfile({
      firstName,
      lastName,
      profilePhoto: null,
      userId: user.id,
    });
  } catch (err) {
    await removeUser(user.id);
    return next(err);
  }

  return res.status(201).json({ message: 'Account created successfully' });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  let user = null;
  try {
    user = await _getUserRawObjectByEmail(email);
    if (!user) throw new UnauthorizeError('Invalid credentials');
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) throw new UnauthorizeError('Invalid credentials');
  } catch (err) {
    if (err instanceof NotFoundError) {
      return next(new InternalServerError(err.message));
    }
    return next(err);
  }

  try {
    const token = await jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET || 'superman',
      {
        expiresIn: '2d',
        // eslint-disable-next-line comma-dangle
      }
    );
    return res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    return next(err);
  }
};

const getLoggedInUser = async (req, res, next) => {
  try {
    const { user } = req;
    const profile = await getProfileByProperties({ user: user._id });
    return res.status(200).json({
      ...new UserResponseModel(user),
      profile,
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = { register, login, getLoggedInUser };
