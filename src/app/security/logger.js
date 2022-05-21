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

const tsFormat = () => (new Date()).toLocaleDateString() + ' - ' + (new Date()).toLocaleTimeString();

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.File({
      timestamp: tsFormat,
      colorize: true, filename: `${path.resolve()}/src/storage/log/${date}.log`, level: 'info'
    }),
    new winston.transports.Console({
      timestamp: tsFormat,
      colorize: true,
      level: process.env.ENV === 'DEV' ? 'verbose' : 'info',
    })
  ]
});

module.exports = { logger };