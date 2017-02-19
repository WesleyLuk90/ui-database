import FieldType from '../../../src/client/models/FieldType';

describe('FieldType', () => {
    it('should list types', () => {
        const types = FieldType.getTypes();
        expect(Array.isArray(types)).toBe(true);
    });

    it('should get types', () => {
        const type = FieldType.getType('text');

        expect(type.getType()).toBe('text');
    });
});
