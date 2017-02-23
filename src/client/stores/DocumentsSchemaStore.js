import rx from 'rx';
import assert from 'assert';

export default class DocumentsSchemaStore {
    constructor(schemaService, documentService) {
        this.schemaService = schemaService;
        this.documentService = documentService;

        this.schema = new rx.BehaviorSubject([]);
        this.documents = new rx.BehaviorSubject([]);
    }

    load(schemaId) {
        assert(schemaId && typeof schemaId === 'string', `Expected schemaId to be a string but got ${schemaId}`);
        return this.schemaService.get(schemaId)
            .then((schema) => {
                this.schema.onNext(schema);
                return this.loadDocuments(schema);
            });
    }

    loadDocuments(schema) {
        return this.documentService.list(schema)
            .then(documents => this.documents.onNext(documents));
    }

    getStream() {
        return this.schema;
    }
}

DocumentsSchemaStore.$name = 'DocumentsSchemaStore';
DocumentsSchemaStore.$inject = ['SchemaService', 'DocumentService'];
