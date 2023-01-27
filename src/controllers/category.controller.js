const { categoryService } = require('../services');

const create = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await categoryService.create({ name });
  if (type) return res.status(type).json({ message });
  return res.status(201).json(message);
};

module.exports = {
  create,
};