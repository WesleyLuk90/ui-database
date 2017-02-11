import Schema from '../../../src/client/models/Schema';

describe('Schema', () => {
    it('should create with default values', () => {
        const schema = Schema.create();
        expect(schema.getName()).toBe('');
        expect(schema.getId()).toBe('');
        expect(schema.getFields()).toEqual([]);
    });

    it('should set values', () => {
        const schema = Schema.create();
        schema.setName('abc');
        expect(schema.getName()).toBe('abc');
        schema.setId('def');
        expect(schema.getId()).toBe('def');
        expect(schema.getFields()).toEqual([]);
    });

    it('should add fields', () => {
        const schema = Schema.create();
        schema.addField({ type: 'a' });
        expect(schema.getFields()).toEqual([{ type: 'a' }]);
    });
});
