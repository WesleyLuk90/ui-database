const assert = require('assert');
const DocumentStorage = require('./DocumentStorage');
const Document = require('./Document');

module.exports = class DocumentController {
    constructor(documentStorage) {
        assert(documentStorage instanceof DocumentStorage);
        this.documentStorage = documentStorage;
    }

    create(request) {
        assert(request.params.schema);

        return this.documentStorage
            .create(Document.create(request.params.schema, null, request.body.data));
    }

    update(request) {
        assert(request.params.schema);
        assert(request.params.id);

        return this.documentStorage
            .update(Document.create(request.params.schema, request.params.id, request.body.data));
    }
};
