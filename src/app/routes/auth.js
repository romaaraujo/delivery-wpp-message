const express = require('express');
const authController = require('../controllers/authController.js');
const { validate } = require('express-validation');

const routes = express.Router();

routes.post('/login', validate(authController.loginValidation), authController.login);

module.exports = routes;