const DocumentStorage = require('../../src/server/DocumentStorage');
const Database = require('../../src/server/Database');
const Config = require('../../src/server/Config');
const Document = require('../../src/server/Document');
const Schema = require('../../src/server/Schema');
const DocumentReference = require('../../src/server/DocumentReference');
const ListResults = require('../../src/server/ListResults');
const ListOptions = require('../../src/server/ListOptions');

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
            .then(() => {
                expect(doc.getCreatedAt() instanceof Date).toBe(true);
                expect(doc.getUpdatedAt() instanceof Date).toBe(true);
            })
            .then(() => documentStorage.get(DocumentReference.create(testSchema, doc.getId())))
            .then(foundDocument => expect(foundDocument).toEqual(doc))
            .catch(fail)
            .then(done);
    });

    it('should not find invalid documents', (done) => {
        documentStorage.get(DocumentReference.create(testSchema, 'abc'))
            .then(found => expect(found).toBeNull())
            .catch(fail)
            .then(done);
    });

    it('should update documents', (done) => {
        const doc = Document.create(testSchema, null, { some: 'data' });
        documentStorage.create(doc)
            .then(() => {
                doc.setData({ other: 'data' });
                return documentStorage.update(doc);
            })
            .then(() => documentStorage.get(DocumentReference.create(testSchema, doc.getId())))
            .then((foundDocument) => {
                expect(foundDocument.getUpdatedAt()).not.toBe(doc.getUpdatedAt());
                expect(foundDocument.getCreatedAt()).toEqual(doc.getCreatedAt());
                expect(foundDocument.getData()).toEqual(doc.getData());
            })
            .catch(fail)
            .then(done);
    });

    describe('list', () => {
        it('should list documents', (done) => {
            documentStorage.create(Document.create(testSchema, null, { some: 'data' }))
                .then(() => documentStorage.create(Document.create(testSchema, null, { some: 'data' })))
                .then(() => documentStorage.list(testSchema))
                .then((results) => {
                    expect(results instanceof ListResults).toBe(true);
                    expect(results.getCount()).toBe(2);
                    expect(results.getTotal()).toBe(2);
                    results.get().forEach(doc => expect(doc instanceof Document).toBe(true));
                })
                .catch(fail)
                .then(done);
        });

        it('should list with limit', (done) => {
            documentStorage.create(Document.create(testSchema, null, { some: 'data' }))
                .then(() => documentStorage.create(Document.create(testSchema, null, { some: 'data' })))
                .then(() => documentStorage.list(testSchema, ListOptions.create().setLimit(1)))
                .then((results) => {
                    expect(results instanceof ListResults).toBe(true);
                    expect(results.getCount()).toBe(1);
                    expect(results.getTotal()).toBe(2);
                    results.get().forEach(doc => expect(doc instanceof Document).toBe(true));
                })
                .catch(fail)
                .then(done);
        });
    });
});
