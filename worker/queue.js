const amqp = require('amqp-connection-manager');
const { logger } = require('../src/app/security/logger');
const whatsappService = require('../src/app/services/whatsapp');

const bootstrap = async () => {
    const connection = amqp.connect(process.env.AMQP_URL);
    const whatsappClient = await whatsappService.client();
    
    const queue = process.env.AMQP_QUEUE;
    const maxAttemps = process.env.AMQP_MESSAGE_MAX_ATTEMPS;
    const errorDelayTime = process.env.AMQP_DELAY_TIME * 1000;

    let attemps = 0;

    const onMessage = async function (data) {
        try {
            if (attemps == maxAttemps) return channelWrapper.ack(data), attemps = 0; // remove from queue
            attemps++;

            const content = data.content.toString();
            const message = JSON.parse(content);

            await whatsappClient
                .sendText(`${message.number}@c.us`, message.message)
                .catch((err) => { 
                    attemps = 0;
                    throw new Error(JSON.stringify(err)) 
                });

            channelWrapper.ack(data);
            logger.info(`Message send: ${content}`)
            attemps = 0;
        } catch (err) {
            logger.error(err.message);
            setTimeout(() => {
                channelWrapper.nack(data);
            }, errorDelayTime)
        }
    }

    connection.on('connect', function () {
        console.log('Connected!');
    });
    connection.on('disconnect', function (err) {
        console.log('Disconnected.', err.stack);
    });

    const channelWrapper = connection.createChannel({
        setup: function (channel) {
            return Promise.all([
                channel.assertQueue(queue, { durable: true }),
                channel.prefetch(1),
                channel.consume(queue, onMessage)
            ]);
        }
    });

    channelWrapper.waitForConnect()
        .then(function () {
            console.log("Listening for messages");
        }).catch(e => console.log(e.message));
}

bootstrap();