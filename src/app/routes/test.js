const express = require('express');
const TestController = require('../controllers/TestController.js');

const routes = express.Router();

routes.get('/', TestController.index);

module.exports = routes;