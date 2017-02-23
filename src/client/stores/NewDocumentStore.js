import rx from 'rx';

export default class NewDocumentStore {
    constructor(schemaService) {
        this.schemaService = schemaService;

        this.schema = new rx.BehaviorSubject();
    }

    load(schemaId) {
        return this.schemaService.get(schemaId)
            .then(schema => this.schema.onNext(schema));
    }

    getStream() {
        return this.schema;
    }
}

NewDocumentStore.$name = 'NewDocumentStore';
NewDocumentStore.$inject = ['SchemaService'];
