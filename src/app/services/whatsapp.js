const { logger } = require('../security/logger');
const venom = require('venom-bot');


const client = async () =>
    await venom
        .create({
            session: process.env.VENOM_SESSION_NAME
        })
        .then((client) => { return client })
        .catch((err) => {
            throw new Error(err);
        });






// const start = (client) => {
//     for(let x = 0; x < 100; x++) {
//         client.sendText('5581988633522@c.us', 'oq?').catch((error) => {console.log(error)})
//     }
// }


// const start = (client) => {
//     client.onMessage((message) => {
//         if (message.body === 'Hi') {
//             client.sendText(message.from, 'Welcome Venom 🕷');
//         }
//     })
// }

function testConnection() {
    return true;
}

module.exports = {
    testConnection,
    client
}

