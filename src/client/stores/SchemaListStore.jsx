import rx from 'rx';

export default class SchemaListStore {
    constructor(schemaService) {
        this.schemaService = schemaService;

        this.schemas = new rx.BehaviorSubject([]);
    }

    load() {
        this.schemaService.list()
            .then(schemas => this.schemas.onNext(schemas));
    }

    getStream() {
        return this.schemas;
    }
}

SchemaListStore.$name = 'SchemaListStore';
SchemaListStore.$inject = ['SchemaService'];
