const { Router } = require('express');
const { loginController } = require('../controllers');
const { validateFieldsUser } = require('../middlewares');

const route = Router();

route.post('/', validateFieldsUser, loginController.loginAuth);

module.exports = route;