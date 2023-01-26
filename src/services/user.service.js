const { User } = require('../models');
const { validateFieldsUser } = require('./validators/validatorFields');
const { generateToken } = require('../utils/jwt');

const create = async (newUser) => {
  const error = validateFieldsUser(newUser);
  if (error.type) return error;
  const existentUser = await User.findOne({
    where: {
      email: newUser.email,
    },
  });
  if (existentUser) return { type: 409, message: 'User already registered' };
  await User.create(newUser);
  const token = generateToken(newUser);
  return { type: null, message: token };
};

const getAll = async () => {
  const data = await User.findAll();
  const users = data
  .map(({ dataValues: { id, displayName, email, image } }) => ({ id, displayName, email, image }));
  return { type: null, message: users };
};

module.exports = {
  create,
  getAll,
};