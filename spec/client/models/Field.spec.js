import Field from '../../../src/client/models/Field';

describe('Field', () => {
    it('should make fields', () => {
        const field = Field.create('text');
        expect(field.getType()).toBe('text');

        expect(field.setType('number').setName('Name').setId('id')).toBe(field);

        expect(field.getType()).toBe('number');
        expect(field.getName()).toBe('Name');
        expect(field.getId()).toBe('id');
    });

    it('should check is new', () => {
        const field = Field.create('text');
        expect(field.isNew()).toBe(true);
        field.setId('a');
        expect(field.isNew()).toBe(false);
    });

    it('should set options', () => {
        const field = Field.create('text');
        expect(field.setOption('abc', 'def')).toBe(field);
        expect(field.getOption('abc')).toBe('def');

        field.setOption('not-defined', null);
        expect(field.getOption('not-defined', 'default')).toBe('default');
    });

    it('should serialize', () => {
        const field = Field.create('text')
            .setId('id')
            .setName('abc')
            .setOption('def', 'hij');
        expect(field.toJSON()).toEqual({
            id: 'id',
            name: 'abc',
            type: 'text',
            options: {
                def: 'hij',
            },
        })
    });
});
