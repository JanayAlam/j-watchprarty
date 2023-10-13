const create = (req, res) => {
  const { email, password, confirmPassword } = req.body;
  return res
    .json({
      email,
      password,
      confirmPassword,
    })
    .status(201);
};

module.exports = {
  create,
};
