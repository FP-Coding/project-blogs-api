const Joi = require('joi');
const idSchema = require('./idSchema');

const titleSchema = Joi.string().required().label('title');
const contentSchema = Joi.string().required().label('content');

const postSchema = Joi.object({
  title: titleSchema,
  content: contentSchema,
  categoryIds: Joi.array().min(1).items(idSchema).required(),
});

const postSchemaUpdate = Joi.object({
  title: titleSchema,
  content: contentSchema,
});

module.exports = {
  postSchema,
  postSchemaUpdate,
};