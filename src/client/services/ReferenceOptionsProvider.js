import assert from 'assert';

class ReferenceOptions {
    constructor(documentService, documentDescriptionService, schemaList, schemaId) {
        this.documentService = documentService;
        this.documentDescriptionService = documentDescriptionService;
        this.schemaList = schemaList;
        assert(typeof schemaId === 'string');
        this.schemaId = schemaId;

        this.cachedOptionsById = new Map();
    }

    optionsProvider() {
        return searchString => this.getOptions(searchString);
    }

    getOptions(searchString) {
        return this.schemaList.getAsync(this.schemaId)
            .then(schema => this.documentService.search(schema, searchString))
            .then(docs => docs.map(d => this.documentDescriptionService.getDescription(d)));
    }
}

export default class ReferenceOptionsProvider {
    constructor(documentService, documentDescriptionService, schemaList) {
        this.documentService = documentService;
        this.documentDescriptionService = documentDescriptionService;
        this.schemaList = schemaList;
    }

    create(schemaId) {
        assert(typeof schemaId === 'string');
        return new ReferenceOptions(this.documentService, this.documentDescriptionService, this.schemaList, schemaId);
    }
}

ReferenceOptionsProvider.$name = 'ReferenceOptionsProvider';
ReferenceOptionsProvider.$inject = ['DocumentService', 'DocumentDescriptionService', 'SchemaList'];
