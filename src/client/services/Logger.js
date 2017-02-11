/* eslint-disable no-console */

export default class Logger {
    error(...args) {
        console.error(...args);
    }

    log(...args) {
        console.log(...args);
    }
}

Logger.$name = 'Logger';
