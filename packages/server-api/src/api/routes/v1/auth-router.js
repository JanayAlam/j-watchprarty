const router = require('express').Router();

const { register } = require('../../controllers/auth-controller');

const { registerUserRequestSchema } = require('../../models/request-models');
const validateBody = require('../../middlewares/validate-request-body');

router.post('/register', validateBody(registerUserRequestSchema), register);

module.exports = router;
