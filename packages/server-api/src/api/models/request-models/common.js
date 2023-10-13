/**
 * Joi schema validator function.
 * @param {Joi.object} schema the schema object of Joi library
 * @param {Object} data the object which client sent
 * @returns {Object} the result object validated by joi
 */
const validate = (schema, data) => {
  const result = schema.validate(data);
  result.value = data;
  return result;
};

module.exports = validate;
