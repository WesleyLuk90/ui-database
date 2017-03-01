import Schema from '../../../src/client/models/Schema';
import FieldType from '../../../src/client/models/FieldType';
import Document from '../../../src/client/models/Document';

describe('Document', () => {
    it('should create from json', () => {
        const schema = new Schema();
        schema.addField(FieldType.getType('text').newField().setId('name'));
        schema.addField(FieldType.getType('text').newField().setId('description'));
        schema.addField(FieldType.getType('number').newField().setId('count'));
        schema.addField(FieldType.getType('datetime').newField().setId('date'));
        const date = new Date();
        const data = {
            id: 'some-id',
            data: {
                name: 'stuff',
                description: 'things',
                count: 10,
                date: date.toJSON(),
            },
        };
        const doc = Document.fromJSON(data, schema);

        expect(doc.getId()).toBe('some-id');
        expect(doc.getValue('name')).toBe('stuff');
        expect(doc.getValue('description')).toBe('things');
        expect(doc.getValue('count')).toBe(10);
        expect(doc.getValue('date')).toEqual(date);
    });

    it('should create with just a schema', () => {
        const schema = new Schema();
        schema.addField(FieldType.getType('text').newField().setId('name'));
        schema.addField(FieldType.getType('text').newField().setId('description'));
        schema.addField(FieldType.getType('number').newField().setId('count'));

        const doc = Document.fromSchema(schema);

        doc.setValue('name', 'some name');
        expect(doc.getValue('name')).toBe('some name');
    });

    it('should serialize to json', () => {
        const schema = new Schema();
        schema.addField(FieldType.getType('text').newField().setId('name'));
        schema.addField(FieldType.getType('text').newField().setId('description'));
        schema.addField(FieldType.getType('number').newField().setId('count'));

        const doc = Document.fromSchema(schema);

        doc.setId('some-id');
        doc.setValue('name', 'some name');
        expect(doc.toJSON()).toEqual({
            id: 'some-id',
            data: {
                name: 'some name',
                description: null,
                count: null,
            },
        });
    });
});
