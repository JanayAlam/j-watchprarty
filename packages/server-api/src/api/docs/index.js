const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

/**
 * Configured the swagger and set a route for the documentation.
 * @param {express.Application} app the express application instance
 * @returns void
 */
const configureSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

module.exports = configureSwagger;
