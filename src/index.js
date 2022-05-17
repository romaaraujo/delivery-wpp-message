const express = require('express');
const bodyParser = require('body-parser');
const whatsappRoutes = require('./app/routes/whatsapp.js');
const healthzRoutes = require('./app/routes/healthz.js');
const authRoutes = require('./app/routes/auth.js');
const ratelimit = require('./app/security/ratelimit.js');
const { logger, httpLogger } = require('./app/security/logger.js');
const helmet = require('helmet');
const timeout = require('./app/security/timeout.js');
const validation = require('./app/middlewares/validation.js');
const token = require('./app/middlewares/token.js');

const server = express();

/* 
* Security Mid
*/
server.use(timeout);
server.use(httpLogger);
server.use(ratelimit);
server.use(helmet.contentSecurityPolicy());
server.use(helmet.hsts());
server.use(helmet.xssFilter());
// #  #   #  #   #  #   #  #   #  #   #  #   #  #   #  #  

server.use(bodyParser.urlencoded({ extended: false }));

/* 
* Routes
*/
server.use('/healthz', healthzRoutes);
server.use('/auth', authRoutes);

// Auth
server.use(token);
server.use('/whatsapp', whatsappRoutes);

/* 
* Validation Mid
*/
server.use(validation);

try {
    const port = process.env.PORT || 8080;
    server.listen(port, () => {
        logger.info(`HTTP Server on ${port}`);
    });
} catch (error) {
    logger.error(error.toString());
}