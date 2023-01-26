const { Router } = require('express');
const { loginController } = require('../controllers');
const { validateFieldsLogin } = require('../middlewares');

const route = Router();

route.post('/', validateFieldsLogin, loginController.loginAuth);

module.exports = route;