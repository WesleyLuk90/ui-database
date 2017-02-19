import assert from 'assert';
import Field from './Field';

export default class Schema {
    static create() {
        return new Schema();
    }

    static fromJSON(data) {
        const schema = Object.assign(Object.create(Schema.prototype), data);
        schema.fields = schema.fields.map(f => Field.fromJSON(f));
        return schema;
    }

    constructor() {
        this.name = '';
        this.id = '';
        this.fields = [];
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
    }

    toJSON() {
        return {
            name: this.name,
            id: this.id,
            fields: this.fields.map(f => f.toJSON()),
        };
    }
}
