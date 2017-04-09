import DocumentReference from '../../../src/client/models/DocumentReference';

describe('DocumentReference', () => {
    it('should get and set values', () => {
        const reference = DocumentReference.create('my_schema', 'my_id');
        expect(reference.getSchemaId()).toBe('my_schema');
        expect(reference.getDocumentId()).toBe('my_id');

        expect(reference.setSchemaId('b')).toBe(reference);
        expect(reference.getSchemaId()).toBe('b');

        expect(reference.setDocumentId('c')).toBe(reference);
        expect(reference.getDocumentId()).toBe('c');
    });

    it('should serialize and deserialize', () => {
        const reference = DocumentReference.create('my_schema', 'my_id');

        expect(reference.toJSON()).toEqual({
            schemaId: 'my_schema',
            documentId: 'my_id',
        });

        const deserialized = DocumentReference.fromJSON(reference.toJSON());
        expect(deserialized).not.toBe(reference);
        expect(deserialized).toEqual(reference);
    });
});
