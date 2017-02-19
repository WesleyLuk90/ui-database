import assert from 'assert';
import FieldType from './FieldType';

export default class Field {
    static create(type) {
        return new Field().setType(type);
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
        assert(FieldType.getType(type));
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
}
