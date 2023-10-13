const router = require('express').Router();

const { create } = require('../../controllers/v1/user-controller');

const { userPostRequestSchema } = require('../../models/request-models');
const validateBody = require('../../middlewares/validate-request-body');

router.post('/', validateBody(userPostRequestSchema), create);

module.exports = router;
