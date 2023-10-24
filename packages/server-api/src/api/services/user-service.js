const BadRequestError = require('../errors/api-errors/BadRequestError');
const { UserResponseModel } = require('../models/response-models');
const {
  store: storeUser,
  getById: getUserById,
  getByProperties: getUsersByProperties,
  removeById,
} = require('../models/data-models/common');
const NotFoundError = require('../errors/api-errors/NotFoundError');

const MODEL_NAME = 'User';

/**
 * Store user object into the database.
 * @param {{ email, password }|null} payload the object that will be stored.
 * @returns {UserResponseModel|null}
 */
const store = async ({ email, password }) => {
  const users = await getUsersByProperties(MODEL_NAME, { email });
  if (users.length > 0) {
    throw new BadRequestError('User exists with the provided email address');
  }
  const user = await storeUser(MODEL_NAME, { email, password });
  return new UserResponseModel(user);
};

/**
 * Fetch a single user from the database based on the query object.
 * @param {{ id: mongoose.Types.ObjectId, email: string }} queryObj the properties to get a user
 * @throws {NotFoundError} if the user is not found with the provided query object's information
 * @returns {UserResponseModel|null}
 */
const get = async (queryObj) => {
  let user = null;
  if (queryObj.id) {
    user = new UserResponseModel(await getUserById(MODEL_NAME, queryObj.id));
  } else if (queryObj.email) {
    const users = await getUsersByProperties(MODEL_NAME, {
      email: queryObj.email,
    });
    if (users.length === 0) return null;
    user = new UserResponseModel(users[0]);
  } else {
    throw new NotFoundError('Invalid query object');
  }
  return user;
};

/**
 * [CAREFUL] Get a single user (all properties) by its email address.
 * @param {string} email the email address of the user
 * @returns {Object|null} user object or null if the user is not found
 */
const _getUserRawObjectByEmail = async (email) => {
  const users = await getUsersByProperties(MODEL_NAME, { email });
  if (users.length === 0) return null;
  return users[0];
};

/**
 * Remove the user by its id
 * @param {mongoose.Types.ObjectId} userId
 * @returns {boolean}
 */
const remove = async (userId) => removeById(MODEL_NAME, userId);

module.exports = { store, get, _getUserRawObjectByEmail, remove };
