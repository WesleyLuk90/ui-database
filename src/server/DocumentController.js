const assert = require('assert');
const DocumentStorage = require('./DocumentStorage');
const Document = require('./Document');

module.exports = class DocumentController {
    constructor(documentStorage) {
        assert(documentStorage instanceof DocumentStorage);
        this.documentStorage = documentStorage;
    }

    create(request) {
        assert(request.body.schema);
        return this.documentStorage
            .create(Document.create(request.body.schema, null, request.body.data));
    }
};
