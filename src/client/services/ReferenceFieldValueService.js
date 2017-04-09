import assert from 'assert';
import Schema from '../models/Schema';

export default class ReferenceFieldValueService {
    constructor(documentService) {
        this.documentService = documentService;
    }

    optionsGetter(schemaId) {
        assert(typeof schemaId === 'string', `Expected schemaId to be a string but got ${schemaId}`);
        const schema = Schema.create().setId(schemaId);
        return searchString => this.documentService.search(schema, searchString);
    }
}

ReferenceFieldValueService.$name = 'ReferenceFieldValueService';
ReferenceFieldValueService.$inject = ['DocumentService'];
