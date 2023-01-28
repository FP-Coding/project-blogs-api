const { Op } = require('sequelize');
const { PostCategory, User, BlogPost, Category } = require('../models');
const { decodeToken } = require('../utils/jwt');
const { validateFieldsPost, validateId } = require('./validators/validatorFields');

const createPost = async (token, { title, content, categoryIds }) => {
  const error = validateFieldsPost({ title, content, categoryIds });
  if (error.type) return error;
  const result = await Category.findAll({ where: { id: { [Op.in]: categoryIds } } });
  if (result.length !== categoryIds.length) { 
    return { type: 400, message: 'one or more "categoryIds" not found' }; 
  }
  const email = decodeToken(token);
  const user = await User.findOne({ where: { email } });
  if (!user) return { type: 404, message: 'User does not exist' };
  const { dataValues } = await BlogPost.create({ title, content, userId: user.dataValues.id });
  const { id: postId } = dataValues;
  await Promise.all(categoryIds.map(async (categoryId) => {
    await PostCategory.create({ categoryId, postId });
  }));
  return { type: null, message: dataValues };
};

const getAll = async () => {
  const result = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return { type: null, message: result };
};

const getById = async (id) => {
  const error = validateId(id);
  if (error.type) return error;
  const result = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  if (!result) return { type: 404, message: 'Post does not exist' };
  return { type: null, message: result };
};

module.exports = {
  createPost,
  getAll,
  getById,
};