import assert from 'assert';
import Q from 'q';
import HttpService from './HttpService';
import Schema from '../models/Schema';
import Document from '../models/Document';
import SchemaService from './SchemaService';

export default class DocumentService {
    constructor(httpService, schemaService) {
        assert(httpService instanceof HttpService);
        assert(schemaService instanceof SchemaService);
        this.httpService = httpService;
        this.schemaService = schemaService;
    }

    create(doc) {
        assert(doc instanceof Document);
        const schema = doc.getSchema();
        return this.httpService.put(`/api/document/${schema.getId()}`, doc.toJSON())
            .then(res => Document.fromJSON(res.result, schema));
    }

    get(schemaId, docId) {
        assert(typeof schemaId === 'string');
        assert(typeof docId === 'string');
        return Q.all([
            this.schemaService.get(schemaId),
            this.httpService.get(`/api/document/${schemaId}/${docId}`),
        ]).then((res) => {
            const schema = res[0];
            const docRes = res[1];

            return Document.fromJSON(docRes.result, schema);
        });
    }

    list(schema) {
        assert(schema instanceof Schema);

        return this.httpService.get(`/api/document/${schema.getId()}/`)
            .then(res => res.result.map(d => Document.fromJSON(d, schema)));
    }

    update(doc) {
        assert(doc instanceof Document);
        const schema = doc.getSchema();
        return this.httpService.post(`/api/document/${schema.getId()}/${doc.getId()}`, doc.toJSON())
            .then(res => Document.fromJSON(res.result, schema));
    }
}

DocumentService.$name = 'DocumentService';
DocumentService.$inject = ['HttpService', 'SchemaService'];
