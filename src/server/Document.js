const assert = require('assert');
const _ = require('lodash');
const DocumentReference = require('./DocumentReference');

class Document {
    static create(schema, id, data) {
        return new Document().setSchema(schema).setId(id).setData(data);
    }

    constructor() {
        this.schema = null;
        this.id = null;
        this.data = null;
        this.createdAt = null;
        this.updatedAt = null;
        this.descriptor = '';
    }

    toReference() {
        return DocumentReference.create(this.schema, this.id);
    }

    setSchema(schema) {
        assert(typeof schema === 'string');
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

    getValue(fieldId) {
        assert(typeof fieldId === 'string');
        if (this.data[fieldId]) {
            return this.data[fieldId];
        }
        return null;
    }

    setCreatedAt(date) {
        assert.ok(date instanceof Date);

        this.createdAt = date;
        return this;
    }

    getCreatedAt() {
        return this.createdAt;
    }

    setUpdatedAt(date) {
        assert.ok(date instanceof Date);
        this.updatedAt = date;
        return this;
    }

    getUpdatedAt() {
        return this.updatedAt;
    }

    setDescriptor(string) {
        assert(typeof string === 'string');
        this.descriptor = string;
        return this;
    }

    getDescriptor() {
        return this.descriptor;
    }

    copy() {
        return Document.create(this.getSchema(), this.getId(), _.clone(this.getData()));
    }
}

module.exports = Document;
