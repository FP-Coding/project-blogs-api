const { Op } = require('sequelize');
const { User } = require('../models');
const { validateFieldsUser } = require('./validators/validatorFields');
const { generateToken } = require('../utils/jwt');

const create = async (newUser) => {
  const error = validateFieldsUser(newUser);
  if (error.type) return error;
  const existentUser = await User.findOne({
    where: {
      email: {
        [Op.like]: newUser.email,
      },
    },
  });
  if (existentUser) return { type: 409, message: 'User already registered' };
  await User.create(newUser);
  const token = generateToken(newUser);
  return { type: null, message: token };
};

module.exports = {
  create,
};