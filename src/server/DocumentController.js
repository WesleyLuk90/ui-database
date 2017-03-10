const assert = require('assert');
const DocumentStorage = require('./DocumentStorage');
const Document = require('./Document');
const DocumentReference = require('./DocumentReference');
const BaseController = require('./BaseController');
const ListOptions = require('./ListOptions');

class DocumentController extends BaseController {
    constructor(documentStorage) {
        super();
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

    get(request) {
        assert(request.params.schema);
        assert(request.params.id);

        return this.documentStorage
            .get(DocumentReference.create(request.params.schema, request.params.id));
    }

    list(request) {
        const params = request.params;
        assert(params.schema);
        const options = ListOptions.create();
        if (params.search) {
            options.setSearch(params.search);
        }
        if (params.limit) {
            options.setLimit(params.limit);
        }

        return this.documentStorage
            .list(request.params.schema, options);
    }
}
DocumentController.$name = 'DocumentController';
DocumentController.$inject = ['DocumentStorage'];
module.exports = DocumentController;
