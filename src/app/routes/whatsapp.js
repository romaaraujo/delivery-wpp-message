const express = require('express');
const whatsappController = require('../controllers/whatsappController.js');
const { validate } = require('express-validation');

const routes = express.Router();

routes.post('/send', validate(whatsappController.validation), whatsappController.send);

module.exports = routes;