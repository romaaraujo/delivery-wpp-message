const amqp = require('amqp-connection-manager');
require('dotenv/config');

const connection = amqp.connect([`amqp://${process.env.AMQP_HOST}`]);
const queue = 'whatsapp';

const onMessage = async function (data) {
    try {

        const message = JSON.parse(data.content.toString());
        console.log(message)
        // const client = await sesuite.createClient({ component: components.WF_WS });

        // const args = {
        //     ProcessID: 'segov-requerimento-informacoes',
        //     WorkflowTitle: 'Teste',
        //     UserID: process.env.SESUITE_USERID
        // };

        // const result = await client.newWorkflowAsync(args)
        //     .catch((e) => { throw new Error(e.body) })
        // res.json(result[0])
        channelWrapper.ack(data);
    } catch (e) {
        console.log(e.message)
        setTimeout(() => {
            channelWrapper.nack(data);
            console.log("Delayed for 1 second.");
        }, "10000")
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