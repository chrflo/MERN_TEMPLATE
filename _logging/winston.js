/*
 * Configuration Example from 
 * (https://www.digitalocean.com/community/tutorials/how-to-use-winston-to-log-node-js-applications)
 * author: Steve Milburn
 */

const appRoot = require('app-root-path');
const winston = require('winston');

// TODO: in the future add these into the configuration file
//TOOD: fix to include the date and time and line and file
const opts = {
    file: {
        level: 'info',
        filename: `${appRoot}/_logs/app.log`,
        handleExceptions: false,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: 'debug',
        handleExceptions: false,
        json: false,
        colorize: true,
    },
}

exports.logger = winston.createLogger({
    transports: [
        new winston.transports.File(opts.file),
        new winston.transports.Console(opts.console)
    ],
    exitOnError: false, // do not exit on handled exceptions
});

// logger.stream = {
//     write: function (message, encoding) {
//         logger.info(message);
//     },
// };