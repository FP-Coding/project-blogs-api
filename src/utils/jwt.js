require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const { JWT_SECRET } = process.env;

const config = {
  // expiresIn: '1h',
  algorithm: 'HS256',
};

const generateToken = async ({ email }) => {
  const { dataValues: { password, ...infoUser } } = await User.findOne({ where: { email } });
  return jwt.sign(infoUser, JWT_SECRET, config); 
};

const verificationToken = (token) => {
  try {
    const user = jwt.verify(token, JWT_SECRET);
    return { type: null, message: user };
  } catch (error) {
    return { type: 401, message: 'Expired or invalid token' };
  }
};

const decodeToken = (token) => jwt.decode(token, JWT_SECRET);

module.exports = {
  generateToken,
  verificationToken,
  decodeToken,
};