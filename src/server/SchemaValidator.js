const assert = require('assert');
const Schema = require('./Schema');
const ValidationError = require('./errors/ValidationError');

class SchemaValidator {
    validate(schema) {
        assert(schema instanceof Schema);

        ValidationError.validate(schema.getName(), 'Schema requires a name');
        ValidationError.validate(schema.getId(), 'Schema requires an id');
        ValidationError.validate(/^[a-z_0-9]+$/.test(schema.getId()), 'Schema can only contain letters, numbers and underscore');

        ValidationError.validate(Array.isArray(schema.getFields()), 'Fields are required');
        schema.getFields().forEach((field) => {
            ValidationError.validate(field.id, 'All fields require an id');
            ValidationError.validate(field.name, 'All fields require a name');
            ValidationError.validate(field.type, 'All fields require a type');
        });

        const ids = new Set();
        schema.getFields().forEach((field) => {
            ValidationError.validate(!ids.has(field.id), `The field with id '${field.id}' is duplicated`);
            ids.add(field.id);
        });

        ValidationError.validate(Array.isArray(schema.getDescriptor()), 'Descriptor is required');
        schema.getDescriptor().forEach((field) => {
            ValidationError.validate(typeof field === 'string', 'Descriptor must be all field ids');
            ValidationError.validate(ids.has(field), `Field '${field}' in descriptor does not exist on the schema`);
        });
    }
}

SchemaValidator.$name = 'SchemaValidator';
module.exports = SchemaValidator;
