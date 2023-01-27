const { Router } = require('express');
const { categoryController } = require('../controllers');
const { validationToken } = require('../middlewares');

const route = Router();

route.post('/', validationToken, categoryController.create);

module.exports = route;