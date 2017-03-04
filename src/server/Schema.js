const assert = require('assert');

module.exports = class Schema {
    static create(name, id) {
        return new Schema().setName(name).setId(id).setFields([]);
    }
    constructor() {
        this.name = null;
        this.fields = null;
        this.id = null;
        this.descriptor = [];
    }
    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
        return this;
    }

    setDescriptor(descriptor) {
        assert(Array.isArray(descriptor));
        this.descriptor = [];
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
        return this;
    }

    setFields(fields) {
        assert(Array.isArray(fields));

        this.fields = fields;
        return this;
    }

    addField(field) {
        this.fields.push(field);
        return this;
    }

    getFields() {
        return this.fields;
    }
};
