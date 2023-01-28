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

const update = async (req, res) => {
  const { id } = req.params;
  const token = req.header('Authorization');
  const infoUpdatePost = req.body;
  const { type, message } = await postCategoryService.update(id, token, infoUpdatePost);
  if (type) return res.status(type).json({ message });
  return res.status(200).json(message);
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const token = req.header('Authorization');
  const { type, message } = await postCategoryService.deletePost(id, token);
  if (type) return res.status(type).json({ message });
  return res.status(204).end();
};

const getBySearch = async (req, res) => {
  const { q } = req.query;
  const { type, message } = await postCategoryService.getBySearch(q);
  if (type) return res.status(type).json({ message });
  return res.status(200).json(message);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deletePost,
  getBySearch,
};