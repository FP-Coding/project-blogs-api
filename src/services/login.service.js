const { generateToken } = require('../utils/jwt');
const { User } = require('../models');

const loginAuth = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });
  console.log(user);
  if (!user || user.password !== password) return { type: 400, message: 'Invalid fields' };
  const token = generateToken({ email });
  return { type: null, message: token };
};

module.exports = {
  loginAuth,
};