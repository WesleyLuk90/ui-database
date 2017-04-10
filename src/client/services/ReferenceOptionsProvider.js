import assert from 'assert';
import DocumentReference from '../models/DocumentReference';

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

    addOption(option) {
        this.cachedOptionsById.set(option.getId(), option);
    }

    addOptions(options) {
        options.forEach(option => this.addOption(option));
    }

    labelMatchesPredicate(label) {
        return o => this.documentDescriptionService.getDescription(o) === label;
    }

    getOptionByLabel(label) {
        return Array.from(this.cachedOptionsById.values()).filter(this.labelMatchesPredicate(label))[0];
    }

    getLabel(documentReference) {
        assert(documentReference instanceof DocumentReference);
        if (this.cachedOptionsById.has(documentReference.getDocumentId())) {
            return Promise.resolve(this.documentDescriptionService.getDescription(this.cachedOptionsById.get(documentReference.getDocumentId())));
        }
        return this.schemaList.getAsync(this.schemaId)
            .then(schema => this.documentService.get(schema.getId(), documentReference.getDocumentId()))
            .then((doc) => {
                this.addOption(doc);
                return this.documentDescriptionService.getDescription(doc);
            });
    }

    getOptions(searchString) {
        return this.schemaList.getAsync(this.schemaId)
            .then(schema => this.documentService.search(schema, searchString))
            .then((docs) => {
                this.addOptions(docs);
                return docs.map(d => this.documentDescriptionService.getDescription(d));
            });
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
