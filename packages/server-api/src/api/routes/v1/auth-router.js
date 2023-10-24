const router = require('express').Router();

const { register, login } = require('../../controllers/auth-controller');
const {
  registerUserRequestSchema,
  loginUserRequestSchema,
} = require('../../models/request-models');
const validateBody = require('../../middlewares/validate-request-body');

router.post('/register', validateBody(registerUserRequestSchema), register);

router.post('/login', validateBody(loginUserRequestSchema), login);

module.exports = router;
