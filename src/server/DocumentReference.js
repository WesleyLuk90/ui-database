const assert = require('assert');

class DocumentReferernce {
    static create(schema, id) {
        return new DocumentReferernce().setId(id).setSchema(schema);
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
};
