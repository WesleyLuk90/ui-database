import assert from 'assert';

export default class DocumentReference {
    static create(schemaId, documentId) {
        return new DocumentReference()
            .setSchemaId(schemaId)
            .setDocumentId(documentId);
    }

    static fromJSON(json) {
        return DocumentReference.create(json.schemaId, json.documentId);
    }

    constructor() {
        this.schemaId = null;
        this.documentId = null;
    }

    setSchemaId(schemaId) {
        assert(typeof schemaId === 'string');
        this.schemaId = schemaId;
        return this;
    }

    getSchemaId() {
        return this.schemaId;
    }

    setDocumentId(documentId) {
        assert(typeof documentId === 'string');
        this.documentId = documentId;
        return this;
    }

    getDocumentId() {
        return this.documentId;
    }

    toJSON() {
        return {
            schemaId: this.getSchemaId(),
            documentId: this.getDocumentId(),
        };
    }
}
