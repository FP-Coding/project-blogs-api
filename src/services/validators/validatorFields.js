const { userSchema } = require('./schemas');

const validateFieldsUser = (user) => {
  const { error } = userSchema.validate(user);
  if (error) return { type: 400, message: error.message };
  return { type: null, message: '' };
};

module.exports = {
  validateFieldsUser,
};