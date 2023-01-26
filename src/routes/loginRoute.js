const { Router } = require('express');
const { loginController } = require('../controllers');

const route = Router();

route.post('/', loginController.loginAuth);

module.exports = route;