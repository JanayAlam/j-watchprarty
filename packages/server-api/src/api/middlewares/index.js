const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const configureRoutes = require('../routes');

/**
 * Configure all middlewares for the provided application instance.
 * @param {express.Application} app express application instance
 */
const configureMiddlewares = (app) => {
  // cross origin resource option
  const corsOption = {
    origin: '*',
    // some legacy browsers (IE11, various SmartTVs) choke on 204
    optionsSuccessStatus: 200,
  };

  // using middlewares
  const middlewares = [
    express.json(),
    express.static('public'),
    morgan('dev'),
    cors(corsOption),
  ];
  middlewares.forEach((middleware) => app.use(middleware));

  // configuring routes
  configureRoutes(app);
};

module.exports = configureMiddlewares;
