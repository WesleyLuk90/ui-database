const assert = require('assert');

module.exports = class DocumentReferernce {
    static create(schema, id) {
        return new DocumentReferernce().setId(id).setSchema(schema);
    }

    constructor() {
        this.id = null;
        this.schema = null;
    }

    setId(id) {
        assert.ok(id);
        this.id = id;
        return this;
    }

    getId() {
        return this.id;
    }

    setSchema(schema) {
        assert.ok(schema);
        this.schema = schema;
        return this;
    }

    getSchema() {
        return this.schema;
    }
};
