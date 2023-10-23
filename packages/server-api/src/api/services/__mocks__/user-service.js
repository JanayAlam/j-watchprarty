const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const BadRequestError = require('../../errors/api-errors/BadRequestError');
const { UserResponseModel } = require('../../models/response-models');

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
  const hashedPassword = await bcrypt.hash(password, 10);
  users[id] = {
    _id: id,
    email,
    password: hashedPassword,
    updatedAt: new Date(),
    createdAt: new Date(),
  };

  return new UserResponseModel(users[id]);
};

const remove = (userId) => {
  delete users[userId];
};

module.exports = { store, remove };
