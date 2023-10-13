const mongoose = require('mongoose');

/**
 * Check the provided id is valid or not.
 * @param {mongoose.Types.ObjectId} id the id which will be checked
 * @returns true if the id is a valid mongoose object id otherwise false
 */
const isValidMongooseId = (id) => {
  let result = false;
  try {
    result = mongoose.isValidObjectId(id);
  } catch (e) {
    return false;
  }
  return result;
};

module.exports = isValidMongooseId;
