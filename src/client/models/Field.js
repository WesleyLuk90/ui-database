import assert from 'assert';
import FieldType from './FieldType';

export default class Field {
    static create(type) {
        return new Field().setType(type);
    }

    static fromJSON(data) {
        return Object.assign(new Field(), data);
    }

    constructor() {
        this.id = '';
        this.name = '';
        this.type = '';
        this.options = {};
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

    isNew() {
        return !this.id;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            type: this.type,
            options: this.options,
        };
    }

    setOption(optionName, optionValue) {
        assert(typeof optionName === 'string');
        assert(typeof optionValue !== 'undefined');
        this.options[optionName] = optionValue;
        return this;
    }

    getOption(optionName, defaultValue) {
        assert(typeof optionName === 'string');
        if (defaultValue != null) {
            if (this.options[optionName] == null) {
                return defaultValue;
            }
        }
        if (optionName in this.options) {
            return this.options[optionName];
        }
        return null;
    }

    getUniqueDescription() {
        return `${this.name} (${this.id})`;
    }
}
