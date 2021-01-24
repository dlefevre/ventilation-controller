/*
 * app/middleware.js
 */

const express = require('express');
const helmet = require('helmet');
const contentSecurityPolicy = require('helmet-csp');
const rateLimit = require('express-rate-limit');
const requestIp = require('request-ip');

const bodyParser = require('body-parser');

const config = require('../config');
const logger = require('./logger.js');

init = (app) => {
    app.enable('trust proxy');
    
    app.use(requestIp.mw());
    app.use(bodyParser.urlencoded({extended: false}));

    app.use('/api', rateLimit( {
        windowMs: 10 * 1000,
        max: 30
    }));
    app.use('/api', bodyParser.json());
    app.use('/web', express.static('web'));

}

module.exports = {
    init: init
}
