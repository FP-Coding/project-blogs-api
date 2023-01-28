const { Op } = require('sequelize');
const Sequelize = require('sequelize');
const { PostCategory, User, BlogPost, Category } = require('../models');
const { decodeToken } = require('../utils/jwt');
const { 
  validateFieldsPost, 
  validateId, 
  validateFieldsUpdatePost, 
} = require('./validators/validatorFields');

const createPost = async (token, { title, content, categoryIds }) => {
  const error = validateFieldsPost({ title, content, categoryIds });
  if (error.type) return error;
  const result = await Category.findAll({ where: { id: { [Op.in]: categoryIds } } });
  if (result.length !== categoryIds.length) { 
    return { type: 400, message: 'one or more "categoryIds" not found' }; 
  }
  const { email } = decodeToken(token);
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
  console.log('teste');
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

const update = async (id, token, { title, content }) => {
  const error = validateFieldsUpdatePost({ title, content });
  if (error.type) return error;
  const isExistentPost = await BlogPost.findByPk(id);
  if (!isExistentPost) return { type: 404, message: 'Post does not exist' };
  const { email } = decodeToken(token);
  const { dataValues: { id: userId } } = await User.findOne({ where: { email } });
  if (isExistentPost.dataValues.userId !== userId) { 
    return { type: 401, message: 'Unauthorized user' }; 
  }
  await BlogPost.update({ title, content, updated: Sequelize.literal('NOW()') }, { where: { id } });
  const postUpdated = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return { type: null, message: postUpdated };
};

const deletePost = async (id, token) => {
  const isExistentPost = await BlogPost.findByPk(id);
  if (!isExistentPost) return { type: 404, message: 'Post does not exist' };
  const { email } = decodeToken(token);
  const { dataValues: { id: userId } } = await User.findOne({ where: { email } });
  if (isExistentPost.dataValues.userId !== userId) { 
    return { type: 401, message: 'Unauthorized user' }; 
  }
  await BlogPost.destroy({ where: { id } });
  return { type: null, message: '' };
};

const getBySearch = async (search) => {
  const result = await BlogPost.findAll({ 
    where: {
    [Op.or]: [{ title: { [Op.like]: `%${search}%` } }, { content: { [Op.like]: `%${search}%` } }],
    }, 
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ] });
  console.log(result);
  return { type: null, message: result };
};

module.exports = {
  createPost,
  getAll,
  getById,
  update,
  deletePost,
  getBySearch,
};