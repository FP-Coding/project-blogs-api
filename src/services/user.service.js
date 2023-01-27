const { User } = require('../models');
const { validateFieldsUser, validateId } = require('./validators/validatorFields');
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

const getById = async (userId) => {
  const error = validateId(userId);
  if (error.type) return error;
  const user = await User.findByPk(userId);
  if (!user) return { type: 404, message: 'User does not exist' };
  const { id, displayName, email, image } = user.dataValues;
  return { type: null, message: { id, displayName, email, image } };
};

module.exports = {
  create,
  getAll,
  getById,
};