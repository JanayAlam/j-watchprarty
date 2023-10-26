const mongoose = require('mongoose');
const { ProfileResponseModel } = require('../../models/response-models');
const NotFoundError = require('../../errors/api-errors/NotFoundError');

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

/**
 * Mock function for fetching a single profile from the database based on the query object.
 * @param {{
 *  id: mongoose.Types.ObjectId,
 *  firstName: string,
 *  lastName: string,
 *  user: mongoose.Types.ObjectId
 * }} queryObj the properties to get a profile
 * @throws {NotFoundError} if the profile is not found with the provided query object's information
 * @returns {ProfileResponseModel|null}
 */
const get = async (queryObj) => {
  let profile = null;
  if (queryObj.id) {
    profile = new ProfileResponseModel(profiles[queryObj.id]);
  } else if (queryObj.firstName || queryObj.lastName || queryObj.user) {
    const ids = Object.keys(profiles).filter(
      // eslint-disable-next-line comma-dangle
      (id) => {
        let condition1 = true;
        let condition2 = true;
        let condition3 = true;

        if (queryObj.firstName) {
          condition1 = profiles[id].firstName === queryObj.firstName;
        }

        if (queryObj.lastName) {
          condition2 = profiles[id].lastName === queryObj.lastName;
        }

        if (queryObj.user) {
          condition3 = profiles[id].user === queryObj.user;
        }

        return condition1 && condition2 && condition3;
        // eslint-disable-next-line comma-dangle
      }
    );
    if (ids.length === 0) return null;
    profile = new ProfileResponseModel(profiles[ids[0]]);
  } else {
    throw new NotFoundError('Invalid query object');
  }
  return profile;
};

module.exports = { store, get };
