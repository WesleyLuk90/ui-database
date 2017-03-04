const Document = require('../../src/server/Document');
const Schema = require('../../src/server/Schema');
const ModuleHarness = require('./ModuleHarness');

describe('DescriptorPopulator', () => {
    let descriptorPopulator;

    beforeEach(() => {
        const module = ModuleHarness.create();
        descriptorPopulator = module.get('DescriptorPopulator');
    });

    it('should populate fields', () => {
        const document = Document.create('my_schema', 'id', { a: 1, b: 'hi', c: null, d: 'hello' });
        const schema = Schema
            .create('name', 'id')
            .setFields([
                { id: 'a', name: 'a', type: 'number' },
                { id: 'b', name: 'b', type: 'text' },
                { id: 'c', name: 'c', type: 'text' },
                { id: 'd', name: 'd', type: 'text' },
            ])
            .setDescriptor(['b', 'd', 'c', 'a']);

        descriptorPopulator.populate(document, schema);

        expect(document.getDescriptor()).toBe('hi hello 1');
    });
});
