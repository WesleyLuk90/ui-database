import Schema from '../../../src/client/models/Schema';
import FieldType from '../../../src/client/models/FieldType';
import Document from '../../../src/client/models/Document';

describe('Document', () => {
    it('should create from json', () => {
        const schema = new Schema();
        schema.addField(FieldType.getType('text').newField().setId('name'));
        schema.addField(FieldType.getType('text').newField().setId('description'));
        schema.addField(FieldType.getType('number').newField().setId('count'));
        const data = {
            id: 'some-id',
            data: {
                name: 'stuff',
                description: 'things',
                count: 10,
            },
        };
        const doc = Document.fromJSON(data, schema);

        expect(doc.getId()).toBe('some-id');
        expect(doc.getValue('name')).toBe('stuff');
        expect(doc.getValue('description')).toBe('things');
        expect(doc.getValue('count')).toBe(10);
    });
});
