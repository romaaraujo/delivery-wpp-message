/**
 * HealthzController
 * 
 * 
 * 
 *  */

const whatsappService = require('../services/whatsapp.js');
const queueService = require('./../services/queue.js');

async function index(req, res) {

    const healthz = {};

    healthz.express = {
        uptime: process.uptime()
    }

    healthz.services = {
        rabbitmq: queueService.testConnection(),
        whatsapp: whatsappService.testConnection()
    }

    res.json(healthz);
}

module.exports = {
    index
}