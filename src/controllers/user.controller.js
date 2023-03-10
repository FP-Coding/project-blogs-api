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

const getById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await userService.getById(id);
  if (type) return res.status(type).json({ message });
  return res.status(200).json(message);
};

const deleteMyOwnUser = async (req, res) => {
  const token = req.header('Authorization');
  const { type, message } = await userService.deleteMyOwnUser(token);
  if (type) return res.status(type).json({ message });
  return res.status(204).end();
};

module.exports = {
  create,
  getAll,
  getById,
  deleteMyOwnUser,
};