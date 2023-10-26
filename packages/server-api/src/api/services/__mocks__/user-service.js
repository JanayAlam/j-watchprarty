const mongoose = require('mongoose');
const BadRequestError = require('../../errors/api-errors/BadRequestError');
const { UserResponseModel } = require('../../models/response-models');
const NotFoundError = require('../../errors/api-errors/NotFoundError');

const users = {};

/**
 * Mock function for storing the user in the database
 * @param {{ email: string, password: string }} payload
 * @returns {UserResponseModel}
 */
const store = async ({ email, password }) => {
  const id = new mongoose.Types.ObjectId();
  if (
    Object.keys(users).filter((uid) => users[uid].email === email).length > 0
  ) {
    throw new BadRequestError('User exists with the provided email address');
  }
  users[id] = {
    _id: id,
    email,
    password,
    updatedAt: new Date(),
    createdAt: new Date(),
  };

  return new UserResponseModel(users[id]);
};

/**
 * Mock function for fetching a single user from the database based on the query object.
 * @param {{ id: mongoose.Types.ObjectId, email: string }} queryObj the properties to get a user
 * @throws {NotFoundError} if the user is not found with the provided query object's information
 * @returns {UserResponseModel|null}
 */
const get = async (queryObj) => {
  let user = null;
  if (queryObj.id) {
    user = new UserResponseModel(users[queryObj.id]);
  } else if (queryObj.email) {
    const ids = Object.keys(users).filter(
      // eslint-disable-next-line comma-dangle
      (id) => users[id].email === queryObj.email
    );
    if (ids.length === 0) return null;
    user = new UserResponseModel(users[ids[0]]);
  } else {
    throw new NotFoundError('Invalid query object');
  }
  return user;
};

/**
 * [CAREFUL] Mock function for getting a single user (all properties) by its email address.
 * @param {string} email the email address of the user
 * @returns {Object|null} user object or null if the user is not found
 */
const _getUserRawObjectByEmail = async (email) => {
  const ids = Object.keys(users).filter(
    // eslint-disable-next-line comma-dangle
    (id) => users[id].email === email
  );
  if (ids.length === 0) return null;
  return users[ids[0]];
};

const remove = (userId) => {
  delete users[userId];
};

module.exports = { store, get, _getUserRawObjectByEmail, remove };
