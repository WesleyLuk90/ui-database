const assert = require('assert');
const Schema = require('./Schema');
const Document = require('./Document');

class DescriptorPopulator {
    populate(document, schema) {
        assert(document instanceof Document);
        assert(schema instanceof Schema);

        const values = schema.getDescriptor()
            .filter(field => document.getValue(field))
            .map(field => document.getValue(field));
        document.setDescriptor(values.join(' '));
    }
}

DescriptorPopulator.$name = 'DescriptorPopulator';
module.exports = DescriptorPopulator;
