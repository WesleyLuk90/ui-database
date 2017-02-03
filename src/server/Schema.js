const assert = require('assert');

module.exports = class Schema {
    constructor() {
        this.name = null;
        this.fields = null;
        this.id = null;
    }
    getId() {
        return this.id;
    }

    setId(id) {
        assert.ok(id);
        this.id = id;
    }

    getName() {
        return this.name;
    }

    setName(name) {
        assert.ok(name);
        this.name = name;
    }

    setFields(fields) {
        assert.ok(Array.isArray(fields));

        this.fields = fields;
    }
};
