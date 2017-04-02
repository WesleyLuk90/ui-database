import assert from 'assert';
import Schema from '../../../src/client/models/Schema';
import SchemaList from './SchemaList';

export default class SchemaService {
    constructor(httpService) {
        assert(httpService);
        this.httpService = httpService;
    }

    create(schema) {
        assert(schema instanceof Schema);

        return this.httpService.put('/api/schema', schema.toJSON())
            .then(res => Schema.fromJSON(res.result));
    }

    list() {
        return this.httpService.get('/api/schema')
            .then(res => res.result.map(Schema.fromJSON));
    }

    get(schemaId) {
        assert(typeof schemaId === 'string' && schemaId);
        return this.httpService.get(`/api/schema/${schemaId}`)
            .then(res => Schema.fromJSON(res.result));
    }

    update(schema) {
        assert(schema instanceof Schema);

        return this.httpService.post('/api/schema', schema.toJSON())
            .then(res => Schema.fromJSON(res.result));
    }

    getSchemaList() {
        return new SchemaList(this);
    }
}

SchemaService.$name = 'SchemaService';
SchemaService.$inject = ['HttpService'];
