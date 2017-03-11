import assert from 'assert';
import FieldType from './FieldType';

export default class Field {
    static create(type) {
        return new Field().setType(type);
    }

    static fromJSON(data) {
        return Object.assign(Object.create(Field.prototype), data);
    }

    constructor() {
        this.id = '';
        this.name = '';
        this.type = '';
    }

    getType() {
        return this.type;
    }

    setType(type) {
        assert(FieldType.getType(type), 'type is required');
        this.type = type;
        return this;
    }

    getName() {
        return this.name;
    }

    setName(name) {
        assert(typeof name === 'string');
        this.name = name;
        return this;
    }

    getId() {
        return this.id;
    }

    setId(id) {
        assert(typeof id === 'string');
        this.id = id;
        return this;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            type: this.type,
        };
    }
}
