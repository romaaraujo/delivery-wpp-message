/**
 * HealthzController
 * 
 * 
 * 
 *  */

require('dotenv/config');
const database = require('./../database/conn.js');

async function checkDatabase() {
    return database.$queryRaw`SELECT 1=1`.then(() => { return true }).catch((e) => { return false });
}

async function index(req, res) {
    const check = {};
    check.express = true;
    check[process.env.DB_DIALECT] = await checkDatabase();

    res.json(check);
}

module.exports = {
    index
}