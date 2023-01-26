const { userService } = require('../services');

const create = async (req, res) => {
  const user = req.body;
  const { type, message } = await userService.create(user);
  if (type) return res.status(type).json({ message });
  return res.status(201).json({ token: message });
}; 

const getAll = async (_req, res) => {
  const { message } = await userService.getAll();
  return res.status(200).json(message);
};

module.exports = {
  create,
  getAll,
};