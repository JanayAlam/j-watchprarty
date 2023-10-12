const express = require('express');
const configureMiddlewares = require('./api/middlewares');
const configureSwagger = require('./api/docs');
const configureError = require('./api/errors');

// creating the application instance
const app = express();

// configuring all middlewares including routes
configureMiddlewares(app);

// configuring swagger
configureSwagger(app);

// handling errors
configureError(app);

module.exports = app;
