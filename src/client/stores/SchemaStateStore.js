import Rx from 'rx';
import assert from 'assert';

export default class SchemaStateStore {
    constructor(schemaService) {
        this.schemaService = schemaService;
        this.schemaStream = new Rx.BehaviorSubject(null);
    }

    loadSchema(id) {
        assert(typeof id === 'string');
        return this.schemaService.get(id)
            .then(schema => this.setSchema(schema));
    }

    setSchema(schema) {
        this.schemaStream.onNext(schema);
    }

    getSchema() {
        return this.schemaStream.getValue();
    }

    getStream() {
        return this.schemaStream;
    }
}

SchemaStateStore.$name = 'SchemaStateStore';
SchemaStateStore.$inject = ['SchemaService'];
