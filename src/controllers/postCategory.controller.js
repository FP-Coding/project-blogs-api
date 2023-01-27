const { postCategoryService } = require('../services');

const create = async (req, res) => {
  const token = req.header('Authorization');
  const newPost = req.body;
  const { type, message } = await postCategoryService.createPost(token, newPost);
  if (type) return res.status(type).json({ message });
  return res.status(201).json(message);
};

module.exports = {
  create,
};