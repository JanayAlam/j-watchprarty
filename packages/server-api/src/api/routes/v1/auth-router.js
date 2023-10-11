const router = require('express').Router();

const { userRegister } = require('../../controllers/v1/auth-controller');

router.post('/register', userRegister);

module.exports = router;
