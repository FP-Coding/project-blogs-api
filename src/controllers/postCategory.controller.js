const { postCategoryService } = require('../services');

const create = async (req, res) => {
  const token = req.header('Authorization');
  const newPost = req.body;
  const { type, message } = await postCategoryService.createPost(token, newPost);
  if (type) return res.status(type).json({ message });
  return res.status(201).json(message);
};

const getAll = async (_req, res) => {
  const { message } = await postCategoryService.getAll();
  return res.status(200).json(message);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await postCategoryService.getById(id);
  if (type) return res.status(type).json({ message });
  return res.status(200).json(message);
};

module.exports = {
  create,
  getAll,
  getById,
};