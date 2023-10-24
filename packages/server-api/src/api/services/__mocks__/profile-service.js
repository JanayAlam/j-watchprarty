const mongoose = require('mongoose');
const { ProfileResponseModel } = require('../../models/response-models');

const profiles = {};

/**
 * Mock function for storing the profile in the database
 * @param {{
 *  firstName: string,
 *  lastName: string,
 *  profilePhoto: string,
 *  userId: mongoose.Types.ObjectId
 * }} payload
 * @returns {ProfileResponseModel}
 */
const store = async ({ firstName, lastName, profilePhoto, userId }) => {
  const id = new mongoose.Types.ObjectId();
  profiles[id] = {
    _id: id,
    firstName,
    lastName,
    profilePhoto,
    user: userId,
    updatedAt: new Date(),
    createdAt: new Date(),
  };
  return new ProfileResponseModel(profiles[id]);
};

module.exports = { store };
