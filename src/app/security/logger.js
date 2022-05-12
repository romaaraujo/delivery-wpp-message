const path = require('path');
const winston = require('winston');
require('dotenv/config');

const date = new Date().toISOString().slice(0, 10);

// error: 0,
// warn: 1,
// info: 2,
// http: 3,
// verbose: 4,
// debug: 5,
// silly: 6

const httpLogger = (req, res, next) => {
  const oldSend = res.send
  res.send = function (data) {
    oldSend.apply(res, arguments)
    logger.http(`Params: ${JSON.stringify(req.params)}, Body: ${JSON.stringify(req.body)}, Host: ${req.headers.host}, Route: ${req.originalUrl}, IP: ${req.ip}, Method: ${req.method}`, { ...req.body, status: res.statusCode, data: data })
  }
  next();
}

const logger = winston.createLogger({
  level: 'http',
  format: winston.format.combine(
    winston.format.simple(),
    winston.format.timestamp()
  ),
  transports: [
    new winston.transports.File({ filename: `${path.resolve()}/src/storage/log/${date}.log`, level: 'http' }),
  ]
});

module.exports = { logger, httpLogger };