const assert = require('assert');
const Database = require('./Database');

class DocumentCollectionProvider {
    constructor(database) {
        assert(database instanceof Database);
        this.database = database;
    }

    get(schemaId) {
        assert(typeof schemaId === 'string');
        return this.database.getCollection(`doc_${schemaId}`)
            .then(col => col.ensureIndex({ descriptor: 'text' })
                .then(() => col));
    }
}

DocumentCollectionProvider.$name = 'DocumentCollectionProvider';
DocumentCollectionProvider.$inject = ['Database'];

module.exports = DocumentCollectionProvider;
