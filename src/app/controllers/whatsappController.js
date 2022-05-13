/**
 * whatsappController
 * 
 * 
 * 
*  */

const { Joi } = require('express-validation');
const { logger } = require('../security/logger.js');
const { channelWrapper } = require('./../services/queue.js');

const validation = {
    body: Joi.object({
        number: Joi.number()
            .required(),
        message: Joi.string()
            .required(),
    })
}

async function send(req, res) {

    try {
        const { number, message } = req.body;

        channelWrapper.sendToQueue(process.env.AMQP_DEFAULT_QUEUE, { "number": number, "message": message });
        return res.send('teste');

    } catch (error) {
        logger.error(error.toString());
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    send,
    validation
}