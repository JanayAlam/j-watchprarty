const mongoose = require('mongoose');
const isValidMongooseId = require('../../utils/check-objectid-validity');

/**
 * Get a record by it's id.
 * @param {string} modelName the name of the model
 * @param {mongoose.Types.ObjectId} id the id of the object
 * @returns {Object|null} the fetched data
 * @throws Error
 */
const getById = async (modelName, id) => {
  if (!isValidMongooseId(id)) return null;
  const data = await mongoose.models[modelName].findById(id);
  return data;
};

/**
 * Store a record into the database.
 * @param {string} modelName the name of the model
 * @param {Object} payload the object that will be stored
 * @returns {Object} the saved data
 * @throws Error
 */
const store = async (modelName, payload) => {
  const model = new mongoose.models[modelName](payload);
  const data = await model.save();
  return data;
};

/**
 * Get a records by it's properties.
 * @param {string} modelName the name of the model
 * @param {Object} payload {default={}} the query object that will be used to fetch the record
 * @returns {Array<Object>|[]} the fetched data
 * @throws Error
 */
const getByProperties = async (modelName, payload = {}) => {
  const items = await mongoose.models[modelName].find(payload);
  return items;
};

/**
 * Update a record by it's id.
 * @param {string} modelName the name of the model
 * @param {mongoose.Types.ObjectId} id the id of the object
 * @param {Object} payload the updated data that will be inserted into the database
 * @returns {Object|null} the newly updated data
 * @throws Error
 */
const updateById = async (modelName, id, payload) => {
  if (!isValidMongooseId(id)) return null;
  const data = await mongoose.models[modelName].findOneAndUpdate(
    { _id: id },
    payload,
    { $new: true } /* eslint comma-dangle: 0 */
  );
  return data;
};

/**
 * Delete a record by it's id.
 * @param {string} modelName the name of the model
 * @param {mongoose.Types.ObjectId} id the id of the object
 * @returns {boolean} true if the data deletion is successful otherwise false
 * @throws Error
 */
const removeById = async (modelName, id) => {
  if (!isValidMongooseId(id)) return false;
  const data = await mongoose.models[modelName].findOneAndDelete({ _id: id });
  return !!data;
};

module.exports = {
  getById,
  store,
  getByProperties,
  updateById,
  removeById,
};
