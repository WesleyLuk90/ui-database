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
});
