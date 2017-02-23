import assert from 'assert';
import HttpService from './HttpService';
import Schema from '../models/Schema';
import Document from '../models/Document';

export default class DocumentService {
    constructor(httpService) {
        assert(httpService instanceof HttpService);
        this.httpService = httpService;
    }

    list(schema) {
        assert(schema instanceof Schema);

        return this.httpService.get(`/api/document/${schema.getId()}/`)
            .then(res => res.result.map(Document.fromJSON));
    }
}

DocumentService.$name = 'DocumentService';
DocumentService.$inject = ['HttpService'];
