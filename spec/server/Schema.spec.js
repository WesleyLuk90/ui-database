const Schema = require('../../src/server/Schema');

describe('Schema', () => {
    it('should be creatable', () => {
        const schema = Schema.create();
        expect(schema instanceof Schema).toBe(true);
    });

    it('should be copyable', () => {
        const schema = Schema.create('name', 'id')
            .setFields([])
            .setDescriptor([]);
        const copy = schema.copy();
        expect(copy).not.toBe(schema);
        expect(copy.getFields()).not.toBe(schema.getFields());
        expect(copy.getDescriptor()).not.toBe(schema.getDescriptor());
        expect(copy).toEqual(schema);
    });

    it('should set id and name', () => {
        const schema = Schema.create('name', 'id');
        expect(schema.getName()).toBe('name');
        expect(schema.getId()).toBe('id');
    });

    it('should set fields', () => {
        const fields = [
            { id: 'a', name: 'a', type: 'text' },
            { id: 'b', name: 'b', type: 'text' },
        ];
        const schema = Schema.create().setFields(fields);
        expect(schema.getFields()).toEqual(fields);
    });
});
