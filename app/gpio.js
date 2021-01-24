
/*
 * app/gpio.js
 */

const config = require('../config');
const logger = require('./logger.js');

const Gpio = require('onoff').Gpio;

const optoTimer  = new Gpio(config.gpio.pinTimer, 'out');
const optoAuto   = new Gpio(config.gpio.pinAuto, 'out');
const optoAway   = new Gpio(config.gpio.pinAway, 'out');
const optoSpeed1 = new Gpio(config.gpio.pinSpeed1, 'out');
const optoSpeed2 = new Gpio(config.gpio.pinSpeed2, 'out');
const optoSpeed3 = new Gpio(config.gpio.pinSpeed3, 'out');

// Release resources on Ctrl+C
process.on('SIGINT', () => {
    optoTimer.unexport();
    optoAuto.unexport();
    optoAway.unexport();
    optospeed1.unexport();
    optospeed2.unexport();
    optospeed3.unexport();
});

// Simulate a button push via one of the opto couplers
trigger = (opto) => {
    opto.writeSync(1);
    setTimeout(() => { opto.writeSync(0) }, config.gpio.toggleDelay);
}

// Simulate specific buttons
triggerAuto = () => {
    logger.info("Request ventilation to switch to auto mode.");
    trigger(optoAuto);
}

triggerAway = () => {
    logger.info("Request ventilation to switch to away mode.");
    trigger(optoAway);
}

triggerSpeed = (speed) => {
    logger.info("Request ventilation to switch to speed preset " + speed);
    switch(speed) {
        case 1:
            trigger(optoSpeed1);
            break;
        case 2:
            trigger(optoSpeed2);
            break;
        case 3:
            trigger(optoSpeed3);
            break;
        default:
            console.error("Invalid speed preset value: " + speed);
            throw new Error("Invalid speed preset value: " + speed);
    }
}

triggerTimer = (duration) => {
    logger.info("Requested ventilation to switch to high speed for " + duration + " minutes.");
    var pulsetable = {15: 1, 30: 2, 60: 3};
    for(var i=0; i<pulsetable[duration]; ++i) {
        setTimeout(() => { trigger(optoTimer) }, (config.gpio.toggleDelay + config.gpio.multiToggleDelay) * i);
    }
}

module.exports = {
    triggerAuto: triggerAuto,
    triggerAway: triggerAway,
    triggerSpeed: triggerSpeed,
    triggerTimer: triggerTimer
}