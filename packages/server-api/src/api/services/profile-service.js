const { store: storeProfile } = require('../models/data-models/common');
const { ProfileResponseModel } = require('../models/response-models');

const MODEL_NAME = 'Profile';

/**
 * Store profile object in the database.
 * @param {{
 * firstName, lastName, profilePhoto, userId }|null
 * } payload the object that will be inserted into the database
 * @returns {ProfileResponseModel|null}
 */
const store = async ({ firstName, lastName, profilePhoto, userId }) => {
  const profile = await storeProfile(MODEL_NAME, {
    firstName,
    lastName,
    profilePhoto,
    user: userId,
  });
  return new ProfileResponseModel(profile);
};

module.exports = { store };
