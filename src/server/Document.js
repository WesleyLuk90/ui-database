const assert = require('assert');

module.exports = class Document {
    static create(schema, id, data) {
        return new Document().setSchema(schema).setId(id).setData(data);
    }

    constructor() {
        this.schema = null;
        this.id = null;
        this.data = null;
    }

    setSchema(schema) {
        assert(schema);
        this.schema = schema;
        return this;
    }

    getSchema() {
        return this.schema;
    }

    setId(id) {
        this.id = id;
        return this;
    }

    getId() {
        return this.id;
    }

    setData(data) {
        this.data = data;
        return this;
    }

    getData() {
        return this.data;
    }
};
