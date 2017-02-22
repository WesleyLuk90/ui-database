import rx from 'rx';
import assert from 'assert';

export default class DocumentsSchemaStore {
    constructor(schemaService) {
        this.schemaService = schemaService;

        this.schema = new rx.BehaviorSubject([]);
    }

    load(schemaId) {
        assert(schemaId && typeof schemaId === 'string', `Expected schemaId to be a string but got ${schemaId}`);
        return this.schemaService.get(schemaId)
            .then(schema => this.schema.onNext(schema));
    }

    getStream() {
        return this.schema;
    }
}

DocumentsSchemaStore.$name = 'DocumentsSchemaStore';
DocumentsSchemaStore.$inject = ['SchemaService'];
