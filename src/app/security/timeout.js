require('dotenv/config');

module.exports = (req, res, next) => {
    req.setTimeout(process.env.DEFAULT_TIMEOUT * 1000);
    next();
};
