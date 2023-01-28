const { Router } = require('express');
const { postCategoryController } = require('../controllers');
const { validationToken } = require('../middlewares');

const route = Router();

route.get('/:id', validationToken, postCategoryController.getById);
route.get('/', validationToken, postCategoryController.getAll);
route.post('/', validationToken, postCategoryController.create);

module.exports = route;