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

    describe('descriptor', () => {
        const baseSchema = Schema.create('things', 'things')
            .setFields([
                { id: 'name', name: 'name', type: 'string' },
                { id: 'id', name: 'id', type: 'number' },
            ]);
        it('should have valid descriptor', () => {
            const schema = baseSchema.copy()
                .setDescriptor(['name', 'id']);
            expect(() => validator.validate(schema)).not.toThrowError();
        });

        it('should check descriptors are fields', () => {
            const schema = baseSchema.copy()
                .setDescriptor(['name', 'not_field']);
            validationError(schema, 'Field \'not_field\' in descriptor does not exist on the schema');
        });

        it('should check descriptors are strings', () => {
            const schema = baseSchema.copy()
                .setDescriptor([{}]);
            validationError(schema, 'Descriptor must be all field ids');
        });
    });
});
