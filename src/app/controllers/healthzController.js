/**
 * HealthzController
 * 
 * 
 * 
 *  */

require('dotenv/config');
const database = require('./../database/conn.js');
const queue = require('./../services/queue.js');

async function checkQueueService() {
    return queue.testConnection();
}

async function index(req, res) {
    const check = {};
    check.express = true;
    check.rabbitmq = await checkQueueService();

    res.json(check);
}

module.exports = {
    index
}