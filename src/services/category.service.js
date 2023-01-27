const { Category } = require('../models');
const { validateName } = require('./validators/validatorFields');

const create = async ({ name }) => {
  const error = validateName(name);
  if (error.type) return error;
  const existentCategory = await Category.findOne({ where: { name } });
  if (existentCategory) return { type: 400, message: 'This category alredy exist' };
  await Category.create({ name });
  const categoryCreated = await Category.findOne({ where: { name } });
  return { type: null, message: categoryCreated }; 
};

const getAll = async () => {
  const categories = await Category.findAll({ order: [['id', 'ASC']] });
  return { type: null, message: categories };
};

module.exports = {
  create,
  getAll,
};