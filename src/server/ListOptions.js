const assert = require('assert');

class ListOptions {
    static create() {
        return new ListOptions();
    }

    constructor() {
        this.limit = 100;
        this.text = null;
    }

    setLimit(limit) {
        assert(typeof limit === 'number' && limit >= 0);
        this.limit = limit;
        return this;
    }

    getLimit() {
        return this.limit;
    }

    setSearch(text) {
        assert(typeof text === 'string');
        this.text = text;
        return this;
    }

    getSearch() {
        return this.text;
    }
}

module.exports = ListOptions;
