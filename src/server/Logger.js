const assert = require('assert');

class Logger {
    get(klass) {
        assert(typeof klass === 'function');
        return this;
    }

    log(...args) {
        console.log(...args);
    }
}

Logger.$name = 'Logger';
module.exports = Logger;
