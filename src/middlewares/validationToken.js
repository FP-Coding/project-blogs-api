const { verificationToken } = require('../utils/jwt');

const validationToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Token not found' });
  const { type, message } = verificationToken(token);
  if (type) return res.status(type).json({ message });
  next();
};

module.exports = validationToken;