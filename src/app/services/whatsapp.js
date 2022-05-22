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

module.exports = {
    client
}

