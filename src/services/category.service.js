const { Category } = require('../models');
const { validateName } = require('./validators/validatorFields');

const create = async ({ name }) => {
  const error = validateName(name);
  if (error.type) return error;
  const existentCategory = await Category.findOne({ where: { name } });
  if (existentCategory) return { type: 400, message: 'This category alredy exist' };
  const { dataValues } = await Category.create({ name });
  return { type: null, message: dataValues }; 
};

const getAll = async () => {
  const categories = await Category.findAll({ order: [['id', 'ASC']] });
  return { type: null, message: categories };
};

module.exports = {
  create,
  getAll,
};