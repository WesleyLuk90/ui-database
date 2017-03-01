const SchemaStorage = require('./SchemaStorage');
const assert = require('assert');
const Schema = require('./Schema');
const BaseController = require('./BaseController');
const SchemaValidator = require('./SchemaValidator');

module.exports = class SchemaController extends BaseController {
    constructor(schemaStorage, schemaValidator) {
        super();
        assert(schemaStorage instanceof SchemaStorage);
        assert(schemaValidator instanceof SchemaValidator);
        this.schemaStorage = schemaStorage;
        this.schemaValidator = schemaValidator;
    }

    create(request) {
        const schema = Schema.create(request.body.name, request.body.id)
            .setFields(request.body.fields);
        this.schemaValidator.validate(schema);
        return this.schemaStorage.create(schema);
    }

    update(request) {
        const schema = Schema.create(request.body.name, request.body.id)
            .setFields(request.body.fields);
        this.schemaValidator.validate(schema);
        return this.schemaStorage.update(schema);
    }

    get(request) {
        return this.schemaStorage.get(request.params.id);
    }

    list(request) {
        assert(request);
        return this.schemaStorage.list();
    }
};
