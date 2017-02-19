const SchemaValidator = require('../../src/server/SchemaValidator');
const Schema = require('../../src/server/Schema');
const ValidationError = require('../../src/server/errors/ValidationError');

describe('SchemaValidator', () => {
    const validator = new SchemaValidator();

    function validationError(schema, error) {
        expect(() => validator.validate(schema)).toThrowError(error);
        expect(() => validator.validate(schema)).toThrowError(ValidationError);
    }

    it('should validate ids', () => {
        validationError(Schema.create('stuff', null), 'Schema requires an id');
        validationError(Schema.create('stuff', ''), 'Schema requires an id');

        validationError(Schema.create('stuff', 'fail -id'), 'Schema can only contain letters, numbers and underscore');
        validationError(Schema.create('stuff', 'NoCapsAllowed'), 'Schema can only contain letters, numbers and underscore');
        validationError(Schema.create('stuff', '!@#'), 'Schema can only contain letters, numbers and underscore');
    });

    it('should validate names', () => {
        validationError(Schema.create(null, 'abc'), 'Schema requires a name');
        validationError(Schema.create('', 'abc'), 'Schema requires a name');
    });

    it('should validate fields', () => {
        validationError(Schema.create('abc', 'abc').addField({ id: '', name: 'field', type: 'name' }), 'All fields require an id');
        validationError(Schema.create('abc', 'abc').addField({ id: 'id', name: '', type: 'name' }), 'All fields require a name');
        validationError(Schema.create('abc', 'abc').addField({ id: 'id', name: 'field', type: '' }), 'All fields require a type');

        validationError(Schema.create('abc', 'abc').addField({ id: 'id', name: 'field', type: 'type' }).addField({ id: 'id', name: 'field', type: 'type' }), 'The field with id \'id\' is duplicated');
    });
});
