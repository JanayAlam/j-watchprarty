const bcrypt = require('bcrypt');
const BadRequestError = require('../errors/api-errors/BadRequestError');
const { UserResponseModel } = require('../models/response-models');
const {
  store: storeUser,
  getByProperties,
  removeById,
} = require('../models/data-models/common');

const MODEL_NAME = 'User';

/**
 * Store user object into the database.
 * @param {{ email, password }|null} payload the object that will be stored.
 * @returns {UserResponseModel|null}
 */
const store = async ({ email, password }) => {
  const users = await getByProperties(MODEL_NAME, { email });
  if (users.length > 0) {
    throw new BadRequestError('User exists with the provided email address');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await storeUser(MODEL_NAME, { email, password: hashedPassword });
  return new UserResponseModel(user);
};

/**
 * Remove the user by its id
 * @param {mongoose.Types.ObjectId} userId
 * @returns {boolean}
 */
const remove = async (userId) => removeById(MODEL_NAME, userId);

module.exports = { store, remove };
