const assert = require('assert');

module.exports = class Schema {
    static create(name, id) {
        return new Schema().setName(name).setId(id).setFields([]);
    }
    constructor() {
        this.name = null;
        this.fields = null;
        this.id = null;
    }
    getId() {
        return this.id;
    }

    setId(id) {
        assert(id && /^[a-z_0-9]+$/.test(id), 'Schema can only contain letters, numbers and underscore');
        this.id = id;
        return this;
    }

    getName() {
        return this.name;
    }

    setName(name) {
        assert(name);
        this.name = name;
        return this;
    }

    setFields(fields) {
        assert(Array.isArray(fields));

        this.fields = fields;
        return this;
    }
};
