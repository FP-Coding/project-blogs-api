const { Router } = require('express');
const { userController } = require('../controllers');
const { validationToken } = require('../middlewares');

const route = Router();

route.post('/', userController.create);
route.get('/', validationToken, userController.getAll);

module.exports = route;