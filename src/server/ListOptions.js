const assert = require('assert');

module.exports = class ListOptions {
    static create() {
        return new ListOptions();
    }

    constructor() {
        this.limit = 100;
    }

    setLimit(limit) {
        assert(typeof limit === 'number' && limit >= 0);
        this.limit = limit;
        return this;
    }

    getLimit() {
        return this.limit;
    }
};
