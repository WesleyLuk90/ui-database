const DocumentStorage = require('../../src/server/DocumentStorage');
const Database = require('../../src/server/Database');
const Config = require('../../src/server/Config');
const Document = require('../../src/server/Document');
const Schema = require('../../src/server/Schema');
const DocumentReference = require('../../src/server/DocumentReference');

describe('DocumentStorage', () => {
    const testSchema = 'test_schema';
    let documentStorage;

    beforeEach((done) => {
        documentStorage = new DocumentStorage(new Database(new Config()));

        documentStorage.clear(Schema.create(testSchema, testSchema))
            .catch(fail)
            .then(done);
    });

    it('should create documents', (done) => {
        const doc = Document.create(testSchema, null, { some: 'data' });
        documentStorage.create(doc)
            .then(() => documentStorage.get(DocumentReference.create(testSchema, doc.getId())))
            .then(foundDocument => expect(foundDocument).toEqual(doc))
            .catch(fail)
            .then(done);
    });
});
