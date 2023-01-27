const Joi = require('joi');

const nameSchema = Joi.string().required().label('name');

module.exports = nameSchema;