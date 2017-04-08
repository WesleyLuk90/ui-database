import assert from 'assert';

/* eslint-disable no-console */

export default class Logger {
    constructor(name, parent) {
        assert(parent == null || parent instanceof Logger);
        this.disabed = false;
        this.name = name;
        this.parent = parent;
    }

    disableLogging() {
        this.disabled = true;
    }

    isDisabled() {
        return this.disabled || (this.parent && this.parent.isDisabled());
    }

    getLogger(klass) {
        assert(typeof klass === 'function');
        return new Logger(klass.name, this);
    }

    error(...args) {
        if (!this.isDisabled()) {
            if (args.length === 1 && args[0] instanceof Error) {
                console.error(args[0]);
                console.error(args[0].stack);
            } else {
                console.error(...args);
            }
        }
    }

    log(...args) {
        if (!this.isDisabled()) {
            console.log(...args);
        }
    }
}

Logger.$name = 'Logger';
