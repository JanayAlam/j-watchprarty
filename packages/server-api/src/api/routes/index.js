const authRouter = require('./v1/auth-router');
const userRouter = require('./v1/user-router');

// api version
const version = 'v1';

// all routes mapper
const routes = [
  {
    path: '/auth',
    router: authRouter,
  },
  {
    path: '/users',
    router: userRouter,
  },
];

/**
 * Configure all the routes for the provided application.
 * @param app express js application instance with will be configured
 * @returns void
 */
const configureRoutes = (app) => {
  // health route
  app.get(`/api/${version}/health`, (_req, res) => res.status(200).send());
  // other routes
  routes.forEach((route) => {
    if (route.path === `/api/${version}`) {
      app.get(route.path, route.router);
    } else {
      app.use(`/api/${version}${route.path}`, route.router);
    }
  });
};

module.exports = configureRoutes;
