import assert from 'assert';
import Schema from '../../../src/client/models/Schema';

export default class SchemaService {
    constructor(httpService) {
        assert(httpService);
        this.httpService = httpService;
    }

    create(schema) {
        assert(schema instanceof Schema);

        return this.httpService.put('/api/schema', schema.toJSON())
            .then(res => Schema.fromJSON(res.schema));
    }
}

SchemaService.$name = 'SchemaService';
SchemaService.$inject = ['HttpService'];
