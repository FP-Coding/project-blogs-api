const { Router } = require('express');
const { postCategoryController } = require('../controllers');
const { validationToken } = require('../middlewares');

const route = Router();

route.post('/', validationToken, postCategoryController.create);
route.get('/', validationToken,
postCategoryController.getAll);

module.exports = route;