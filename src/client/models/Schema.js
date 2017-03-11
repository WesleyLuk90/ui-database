import assert from 'assert';
import _ from 'lodash';
import Field from './Field';

export default class Schema {
    static create() {
        return new Schema();
    }

    static fromJSON(data) {
        const schema = Object.assign(Object.create(Schema.prototype), data);
        schema.fields = schema.fields.map(f => Field.fromJSON(f));
        schema.descriptor = schema.descriptor.slice();
        return schema;
    }

    constructor() {
        this.name = '';
        this.id = '';
        this.fields = [];
        this.descriptor = [];
    }

    getDescriptor() {
        return this.descriptor;
    }

    setDescriptor(descriptor) {
        this.descriptor = descriptor;
        return this;
    }

    setName(name) {
        this.name = name;
        return this;
    }

    getName() {
        return this.name;
    }

    setId(id) {
        this.id = id;
        return this;
    }

    getId() {
        return this.id;
    }

    getFields() {
        return this.fields.slice();
    }

    addField(field) {
        assert(field instanceof Field);
        this.fields.push(field);
        return this;
    }

    getField(fieldId) {
        assert(typeof fieldId === 'string');
        const field = _(this.fields).filter(f => f.getId() === fieldId).first();
        assert(field, `Field with id ${fieldId} does not exist on this schema`);
        return field;
    }

    isNew() {
        return !this.id;
    }

    toJSON() {
        return {
            name: this.name,
            id: this.id,
            fields: this.fields.map(f => f.toJSON()),
            descriptor: this.descriptor.slice(),
        };
    }
}
