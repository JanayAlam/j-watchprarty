const express = require('express');
const configureMiddlewares = require('./api/middlewares');
const configureError = require('./api/errors');

// creating the application instance
const app = express();

// configuring all middlewares including routes
configureMiddlewares(app);

// handling errors
configureError(app);

module.exports = app;
