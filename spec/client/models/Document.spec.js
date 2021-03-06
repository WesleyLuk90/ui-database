import Schema from '../../../src/client/models/Schema';
import FieldType from '../../../src/client/models/FieldType';
import Document from '../../../src/client/models/Document';
import DocumentReference from '../../../src/client/models/DocumentReference';

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
            descriptor: 'My Description',
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
        expect(doc.getDescriptor('descriptor')).toEqual('My Description');
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

    it('should serialize document references', () => {
        const schema = new Schema();
        schema.addField(FieldType.getType('reference').newField().setId('some_ref'));

        const doc = Document.fromJSON({
            id: 'abc',
            data: {
                some_ref: {
                    schemaId: 'other_schema',
                    documentId: 'some_id',
                },
            },
        }, schema);

        expect(doc.getValue('some_ref')).toEqual(DocumentReference.create('other_schema', 'some_id'));

        expect(doc.toJSON()).toEqual({
            id: 'abc',
            data: {
                some_ref: {
                    schemaId: 'other_schema',
                    documentId: 'some_id',
                },
            },
        });
    });

    it('should convert to a reference', () => {
        const schema = new Schema().setId('bed');
        const doc = Document.fromSchema(schema).setId('abc');

        const ref = doc.toReference();
        expect(ref).toEqual(jasmine.any(DocumentReference));

        expect(ref.getSchemaId()).toBe('bed');
        expect(ref.getDocumentId()).toBe('abc');
    });
});
