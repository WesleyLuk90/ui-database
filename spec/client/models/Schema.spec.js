import Schema from '../../../src/client/models/Schema';
import Field from '../../../src/client/models/Field';

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
        expect(schema.addField(Field.create('text'))).toBe(schema);
        expect(schema.getFields()).toEqual([Field.create('text')]);

        expect(() => schema.addField({})).toThrow();
    });

    it('should set and get a name', () => {
        const schema = Schema.create();
        expect(schema.setName('name')).toBe(schema);
        expect(schema.getName()).toEqual('name');
    });

    it('should set and get a descriptor', () => {
        const schema = Schema.create();
        expect(schema.setDescriptor(['a', 'b'])).toBe(schema);
        expect(schema.getDescriptor()).toEqual(['a', 'b']);

        expect(() => schema.setDescriptor({})).toThrowError(/Expected an array of field ids but got/);
        expect(() => schema.setDescriptor([{}])).toThrowError(/Expected a descriptor id but got/);
    });

    it('should serialize and deserialize to the same', () => {
        const schema = Schema.create()
            .setId('a')
            .setName('b')
            .addField(Field.create('text'))
            .setDescriptor(['e']);
        const roundTrip = Schema.fromJSON(schema.toJSON());
        expect(roundTrip).not.toBe(schema);
        expect(roundTrip).toEqual(schema);
    });

    it('should check is new', () => {
        const schema = Schema.create();
        expect(schema.isNew()).toBe(true);
        schema.setId('a');
        expect(schema.isNew()).toBe(false);
    });
});
