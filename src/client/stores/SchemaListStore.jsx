import rx from 'rx';

export default class SchemaListStore {
    constructor(schemaService, documentService) {
        this.schemaService = schemaService;
        this.documentService = documentService;

        this.documentCounts = new Map();
        this.documentCountStream = new rx.BehaviorSubject(this.documentCounts);
        this.schemas = new rx.BehaviorSubject([]);
        this.schemas.subscribe(schemas => schemas.forEach(schema => this.loadDocumentCount(schema)));
    }

    loadDocumentCount(schema) {
        this.documentService.count(schema)
            .then((count) => {
                this.documentCounts.set(schema.getId(), count);
                this.documentCountStream.onNext(this.documentCounts);
            });
    }

    load() {
        return this.schemaService.list()
            .then(schemas => this.schemas.onNext(schemas));
    }

    getStream() {
        return this.schemas;
    }

    getDocumentCountStream() {
        return this.documentCountStream;
    }
}

SchemaListStore.$name = 'SchemaListStore';
SchemaListStore.$inject = ['SchemaService', 'DocumentService'];
