require('dotenv').config();
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const config = {
  // expiresIn: '1h',
  algorithm: 'HS256',
};

const generateToken = ({ email }) => jwt.sign({ email }, JWT_SECRET, config);

const verificationToken = (token) => {
  try {
    const user = jwt.verify(token, JWT_SECRET);
    return { type: null, message: user };
  } catch (error) {
    return { type: 401, message: 'Expired or invalid token' };
  }
};

module.exports = {
  generateToken,
  verificationToken,
};