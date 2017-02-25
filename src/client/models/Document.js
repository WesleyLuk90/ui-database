import assert from 'assert';
import Schema from './Schema';

export default class Document {
    static fromJSON(data, schema) {
        assert(schema instanceof Schema, 'Schema is required');
        assert(data, 'data is required');

        const doc = new Document(schema);
        doc.setId(data.id);
        schema.getFields().forEach(field => doc.setValue(field.getId(), data.data[field.getId()]));

        return doc;
    }

    static fromSchema(schema) {
        return new Document(schema);
    }

    constructor(schema) {
        assert(schema instanceof Schema);
        this.id = '';
        this.data = {};
        this.schema = schema;
    }

    setSchema(schema) {
        assert(schema instanceof Schema);
        this.schema = schema;
    }

    getSchema() {
        return this.schema;
    }

    setId(id) {
        assert(typeof id === 'string');
        this.id = id;
        return this;
    }

    getId() {
        return this.id;
    }

    setValue(fieldId, value) {
        const field = this.schema.getField(fieldId);

        this.data[field.getId()] = value;
        return this;
    }

    getValue(fieldId) {
        assert(this.schema.getField(fieldId));

        return this.data[fieldId];
    }

    toJSON() {
        const data = {};
        const schema = this.getSchema();
        schema.getFields().forEach((field) => {
            if (this.data[field.getId()] == null) {
                data[field.getId()] = null;
            } else {
                data[field.getId()] = this.data[field.getId()];
            }
        });
        return {
            id: this.getId(),
            data: data,
        };
    }
}
