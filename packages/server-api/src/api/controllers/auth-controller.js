const {
  store: storeUser,
  remove: removeUser,
} = require('../services/user-service');
const { store: storeProfile } = require('../services/profile-service');

const register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  let user = null;

  try {
    user = await storeUser({ email, password });
  } catch (err) {
    return next(err);
  }

  try {
    await storeProfile({
      firstName,
      lastName,
      profilePhoto: null,
      userId: user.id,
    });
  } catch (err) {
    await removeUser(user.id);
    return next(err);
  }

  return res.status(201).json({ message: 'Account created successfully' });
};

module.exports = { register };
