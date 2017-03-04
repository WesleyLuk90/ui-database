const assert = require('assert');

class DocumentReference {
    static create(schema, id) {
        return new DocumentReference().setId(id).setSchema(schema);
    }

    constructor() {
        this.id = null;
        this.schema = null;
    }

    setId(id) {
        assert(id);
        this.id = id;
        return this;
    }

    getId() {
        return this.id;
    }

    setSchema(schema) {
        assert(schema);
        this.schema = schema;
        return this;
    }

    getSchema() {
        return this.schema;
    }
}

module.exports = DocumentReference;
