const assert = require('assert');

class ListResults {

    static create(results) {
        const res = new ListResults();
        res.setResults(results);
        return res;
    }

    constructor() {
        this.results = [];
        this.total = 0;
    }

    setResults(results) {
        assert(Array.isArray(results));
        this.results = results;
    }

    get() {
        return this.results;
    }

    getCount() {
        return this.results.length;
    }

    setTotal(count) {
        assert(typeof count === 'number' && count >= 0);
        this.total = count;
        return this;
    }

    getTotal() {
        return this.total;
    }

    toJSON() {
        return {
            result: this.get(),
            total: this.getTotal(),
        };
    }
}

module.exports = ListResults;
