const SchemaStorage = require('./SchemaStorage');
const assert = require('assert');
const Schema = require('./Schema');
const BaseController = require('./BaseController');
const SchemaValidator = require('./SchemaValidator');

class SchemaController extends BaseController {
    constructor(schemaStorage, schemaValidator) {
        super();
        assert(schemaStorage instanceof SchemaStorage);
        assert(schemaValidator instanceof SchemaValidator);
        this.schemaStorage = schemaStorage;
        this.schemaValidator = schemaValidator;
    }

    schemaFromBody(body) {
        const schema = Schema.create(body.name, body.id)
            .setFields(body.fields)
            .setDescriptor(body.descriptor);
        this.schemaValidator.validate(schema);
        return schema;
    }

    create(request) {
        return this.schemaStorage.create(this.schemaFromBody(request.body));
    }

    update(request) {
        return this.schemaStorage.update(this.schemaFromBody(request.body));
    }

    get(request) {
        return this.schemaStorage.get(request.params.id);
    }

    list(request) {
        assert(request);
        return this.schemaStorage.list();
    }
}

SchemaController.$name = 'SchemaController';
SchemaController.$inject = ['SchemaStorage', 'SchemaValidator'];
module.exports = SchemaController;
