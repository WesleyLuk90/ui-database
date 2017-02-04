const SchemaStorage = require('./SchemaStorage');
const assert = require('assert');
const Schema = require('./Schema');

module.exports = class SchemaController {
    constructor(schemaStorage) {
        assert.ok(schemaStorage instanceof SchemaStorage);
        this.schemaStorage = schemaStorage;
    }

    create(request) {
        const schema = Schema.create(request.body.name, request.body.id);

        return this.schemaStorage.create(schema);
    }

    update(request) {
        const schema = Schema.create(request.body.name, request.body.id)
            .setFields(request.body.fields);

        return this.schemaStorage.update(schema);
    }

    get(request) {
        return this.schemaStorage.get(request.params.id);
    }

    list(request) {
        assert.ok(request);
        return this.schemaStorage.list();
    }
};
