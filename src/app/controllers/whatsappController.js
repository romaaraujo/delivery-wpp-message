/**
 * whatsappController
 * 
 * 
 * 
*  */

const { Joi } = require('express-validation');
const { logger } = require('../security/logger.js');
const queue = require('./../services/queue.js');

const validation = {
    body: Joi.object({
        number: Joi.string()
            .required()
            .length(13),
        message: Joi.string()
            .required(),
    })
}

async function send(req, res) {

    try {
        const { number, message } = req.body;

        if (!queue.testConnection()) throw new Error('Connection failed');

        queue.channelWrapper.sendToQueue(process.env.AMQP_QUEUE, { "number": number, "message": message });

        return res.status(201).json({ error: false, message: 'Success' });
    } catch (error) {
        logger.error(error.toString());
        return res.status(500).json({ error: true, message: 'Internal server error', detail: error.message });
    }
}

module.exports = {
    send,
    validation
}