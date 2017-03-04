const Schema = require('../../src/server/Schema');

describe('Schema', () => {
    it('should be creatable', () => {
        const schema = Schema.create();
        expect(schema instanceof Schema).toBe(true);
    });

    it('should be copyable', () => {
        const schema = Schema.create();
        const copy = schema.copy();
        expect(copy).not.toBe(schema);
        expect(copy.getFields()).not.toBe(schema.getFields());
        expect(copy.getDescriptor()).not.toBe(schema.getDescriptor());
        expect(copy).toEqual(schema);
    });
});
