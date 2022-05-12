const express = require('express');
const HealthzController = require('../controllers/HealthzController.js');

const routes = express.Router();

routes.get('/', HealthzController.index);

module.exports = routes;