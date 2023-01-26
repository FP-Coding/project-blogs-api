const { loginService } = require('../services');

const loginAuth = async (req, res) => {
  const { type, message } = await loginService.loginAuth(req.body);
  if (type) return res.status(type).json({ message });
  return res.status(200).json({ token: message });
};

module.exports = {
  loginAuth,
};