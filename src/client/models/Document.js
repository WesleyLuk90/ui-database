import assert from 'assert';
import Schema from './Schema';
import DocumentReference from './DocumentReference';

export default class Document {
    static fromJSON(data, schema) {
        assert(schema instanceof Schema, 'Schema is required');
        assert(data, 'data is required');

        const doc = new Document(schema);
        doc.setId(data.id);
        doc.setDescriptor(data.descriptor);
        schema.getFields().forEach((field) => {
            const value = data.data[field.getId()];
            if (field.getType() === 'datetime' && value != null) {
                doc.setValue(field.getId(), new Date(value));
            } else if (field.getType() === 'reference' && value != null) {
                doc.setValue(field.getId(), DocumentReference.fromJSON(value));
            } else {
                doc.setValue(field.getId(), value);
            }
        });

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

    setDescriptor(newDescriptor) {
        this.descriptor = newDescriptor;
        return this;
    }

    getDescriptor() {
        return this.descriptor;
    }

    toReference() {
        return DocumentReference.create(this.getSchema().getId(), this.getId());
    }

    toJSON() {
        const data = {};
        const schema = this.getSchema();
        schema.getFields().forEach((field) => {
            const value = this.data[field.getId()];
            if (value == null) {
                data[field.getId()] = null;
            } else if (field.getType() === 'reference') {
                data[field.getId()] = value.toJSON();
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
