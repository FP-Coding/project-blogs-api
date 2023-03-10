const { userSchema, idSchema, nameSchema, postSchema } = require('./schemas');

const validateFieldsUser = (user) => {
  const { error } = userSchema.validate(user);
  if (error) return { type: 400, message: error.message };
  return { type: null, message: '' };
};

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 400, message: error.message };
  return { type: null, message: '' };
};

const validateName = (name) => {
  const { error } = nameSchema.validate(name);
  if (error) return { type: 400, message: error.message };
  return { type: null, message: '' };
};

const validateFieldsPost = (postInfo) => {
  const { error } = postSchema.postSchema.validate(postInfo);
  if (error) return { type: 400, message: 'Some required fields are missing' };
  return { type: null, message: '' }; 
};

const validateFieldsUpdatePost = (postInfo) => {
  const { error } = postSchema.postSchemaUpdate.validate(postInfo);
  if (error) return { type: 400, message: 'Some required fields are missing' };
  return { type: null, message: '' }; 
};

module.exports = {
  validateFieldsUser,
  validateId,
  validateName,
  validateFieldsPost,
  validateFieldsUpdatePost,
};