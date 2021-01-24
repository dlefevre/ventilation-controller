/*
 * config/index.js
 */ 

const os = require('os');
const path = require('path');

const config = {};

// Application configuration
config.application = {
    port: process.env.PORT || 8080,
    host: process.env.HOST || '0.0.0.0',
    loglevel: process.env.LOGLEVEL || 'info'
}

// Setup of the GPIO pins
config.gpio = {
    enabled: true,
    toggleDelay: 200,
    multiToggleDelay: 200,

    pinAuto: 25,
    pinAway: 20,
    pinTimer: 13,
    pinSpeed1: 21,
    pinSpeed2: 26,
    pinSpeed3: 19
}

// Disable GPIO connection if requested
if(process.env.GPIO_ENABLED) {
    gpio_enabled = process.env.GPIO_ENABLED.toLowerCase();
    if(gpio_enabled === 'no' || gpio_enabled === 'false') {
        config.gpio.enabled = false;
    }
}

module.exports = config;