/*
 * app/index.js
 */

// Imports
const express = require('express');
const util = require('util');

const config = require('../config');
const gpio = config.gpio.enabled ? require('./gpio.js') : require('./gpio_stub.js');
const logger = require('./logger.js');

// Set up app
const app = express();
const ejs = require('ejs');
app.set('view engine', 'ejs');
require('./middleware.js').init(app);

// Create error response
error = (res, code, message) => {
    logger.error(message);
    res.json({
        "result": "ERROR",
        "message": message
    });
    res.status(code);
}

// Create successful response
ok = (res) => {
    res.json({
        "result": "OK"
    });
    res.status(200);
}


// Default get
app.post("/api/ventilation/mode", (req, res) => {
    if(!("mode" in req.body)) {
        error(res, 400, "Mandatory property 'mode' wasn't specified.");
        return;
    }
    switch(req.body.mode) {
        case 'auto':
            gpio.triggerAuto();
            break;
        case 'away':
            gpio.triggerAway();
            break;
        case 'speed1':
            gpio.triggerSpeed(1);
            break;
        case 'speed2':
            gpio.triggerSpeed(2);
            break;
        case 'speed3':
            gpio.triggerSpeed(3);
            break;
        default:
            error(res, 400, "Invalid value for property 'mode'.");
            return;
    }
    ok(res);
});

app.post("/api/ventilation/timer", (req, res) => {
    if(!("duration" in req.body)) {
        error(res, 400, "Mandatory property 'duration' wasn't specified.");
        return;
    }
    if(["15","30","60"].includes(req.body.duration)) {
        gpio.triggerTimer(req.body.duration);
    } else {
        error(res, 400, "Invalid value for 'duration'. Use 15, 30 or 60.");
        return;
    }
    ok(res);
});

app.get("/", (req, res) => {
    res.redirect(302, "/web/main.html");
});
app.get("/web", (req, res) => {
    res.redirect(302, "/web/main.html");
});
app.get("/favicon")

module.exports = app;
