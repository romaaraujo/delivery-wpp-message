const amqp = require('amqp-connection-manager');
const { logger } = require('../security/logger');


const connection = amqp.connect([`amqp://${process.env.AMQP_HOST}`]);
const channelWrapper = connection.createChannel({
    json: true,
    setup: function (channel) {
        return channel.assertQueue(process.env.AMQP_DEFAULT_QUEUE, { durable: true });
    },
});

function testConnection() {
    return connection.isConnected();
}

module.exports = {
    channelWrapper,
    testConnection
}

