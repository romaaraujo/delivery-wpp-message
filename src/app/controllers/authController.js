/**
 * AuthController
 * 
 * 
 * 
 *  */

require('dotenv/config');
const database = require('./../database/conn.js');
const queue = require('./../services/queue.js');

const { Joi } = require('express-validation');

const defaultLogin = {
    user: 'api',
    key: 'api.key.api'
}

const loginValidation = {
    body: Joi.object({
        user: Joi.string()
            .required(),
        key: Joi.string()
            .required(),
    })
}

async function login(req, res) {

    const { user, key } = req.body;

    if (user != defaultLogin.user
        || key != defaultLogin.key) return res.status(401).json({ error: true, message: 'Invalid Login.' });

    const jwtService = require("jsonwebtoken");
    const secretKey = process.env.SECRET_KEY;

    jwtService.sign(user, secretKey, (err, token) => {
        if (err) {
            res
                .status(500)
                .json({ error: true, message: 'JWT error.' });

            return;
        }

        return res.status(200).json({ error: false, access_token: token });
    });
}

module.exports = {
    login,
    loginValidation
}