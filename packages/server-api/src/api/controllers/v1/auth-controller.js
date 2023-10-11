const userRegister = async (_req, res) => {
  const responseData = { msg: 'success' };
  return res.json(responseData).status(200);
};

module.exports = {
  userRegister,
};
