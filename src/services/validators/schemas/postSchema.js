const Joi = require('joi');
const idSchema = require('./idSchema');

const postSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().min(1).items(idSchema).required(),
});

module.exports = postSchema;