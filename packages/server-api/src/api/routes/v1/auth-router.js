const router = require('express').Router();

const {
  register,
  login,
  getLoggedInUser,
} = require('../../controllers/auth-controller');
const {
  registerUserRequestSchema,
  loginUserRequestSchema,
} = require('../../models/request-models');
const { validateBody, isAuthenticated } = require('../../middlewares');

router.post('/register', validateBody(registerUserRequestSchema), register);

router.post('/login', validateBody(loginUserRequestSchema), login);

router.get('/user', isAuthenticated, getLoggedInUser);

module.exports = router;
