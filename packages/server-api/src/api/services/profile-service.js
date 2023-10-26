const NotFoundError = require('../errors/api-errors/NotFoundError');
const {
  store: storeProfile,
  getById: getProfileById,
  getByProperties,
} = require('../models/data-models/common');
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

/**
 * Fetch a single profile from the database based on the query object.
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
    profile = new ProfileResponseModel(
      // eslint-disable-next-line comma-dangle
      await getProfileById(MODEL_NAME, queryObj.id)
    );
  } else if (queryObj.firstName || queryObj.lastName || queryObj.user) {
    const profiles = await getByProperties(MODEL_NAME, { ...queryObj });
    if (profiles.length === 0) return null;
    profile = new ProfileResponseModel(profiles[0]);
  } else {
    throw new NotFoundError('Invalid query object');
  }
  return profile;
};

module.exports = { store, get };
