const { Router } = require('express');
const { userController } = require('../controllers');
// const {  } = require('../middlewares');

const route = Router();

route.post('/', userController.create);

module.exports = route;