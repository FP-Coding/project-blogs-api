const { Op } = require('sequelize');
const { generateToken } = require('../utils/jwt');
const { User } = require('../models');

const loginAuth = async ({ email, password }) => {
  const user = await User.findOne({
    where: {
      email: {
        [Op.like]: email,
      },
    },
  });
  if (!user || user.password !== password) return { type: 400, message: 'Invalid fields' };
  const token = generateToken(email);
  return { type: null, message: token };
};

module.exports = {
  loginAuth,
};