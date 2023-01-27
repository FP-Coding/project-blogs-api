const Joi = require('joi');

const idSchema = Joi.number().integer().min(1);

module.exports = idSchema;