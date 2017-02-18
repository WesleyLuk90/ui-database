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

    getId() {
        return this.id;
    }
}
