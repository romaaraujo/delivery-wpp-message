const express = require('express');
const healthzController = require('../controllers/healthzController.js');

const routes = express.Router();

routes.get('/', healthzController.index);

module.exports = routes;