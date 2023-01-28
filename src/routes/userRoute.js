const { Router } = require('express');
const { userController } = require('../controllers');
const { validationToken } = require('../middlewares');

const route = Router();

route.get('/:id', validationToken, userController.getById);
route.delete('/me', validationToken, userController.deleteMyOwnUser);
route.post('/', userController.create);
route.get('/', validationToken, userController.getAll);

module.exports = route;