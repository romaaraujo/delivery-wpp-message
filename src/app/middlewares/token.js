/**
 * Token
 * 
 * 
 * 
 *  */

module.exports = (req, res, next) => {
    const jwtService = require("jsonwebtoken");
    const jwt = req.headers["authorization"];
    const secretKey = process.env.SECRET_KEY;

    jwtService.verify(jwt, secretKey, (err, userInfo) => {
        if (err) {
            res.status(403).json({ error: true, message: 'Invalid Token' });
            return;
        }

        req.userInfo = userInfo;
        next();
    });
}

