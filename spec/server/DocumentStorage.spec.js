const Q = require('q');
const Document = require('../../src/server/Document');
const Schema = require('../../src/server/Schema');
const DocumentReference = require('../../src/server/DocumentReference');
const ListResults = require('../../src/server/ListResults');
const ListOptions = require('../../src/server/ListOptions');
const ModuleHarness = require('./ModuleHarness');

describe('DocumentStorage', () => {
    const testSchema = 'test_schema';
    let documentStorage;
    let schemaStorage;

    beforeEach((done) => {
        const module = ModuleHarness.create();
        schemaStorage = module.get('SchemaStorage');
        documentStorage = module.get('DocumentStorage');
        spyOn(schemaStorage, 'get').and.returnValue(Q.when(Schema.create('name', 'id')
            .setDescriptor(['id', 'name'])));
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

    describe('descriptor', () => {
        it('should populate a descriptor', (done) => {
            documentStorage.create(Document.create(testSchema, null, { id: '7', name: 'abc' }))
                .then((created) => {
                    expect(created.getDescriptor()).toBe('7 abc');
                    return documentStorage.get(DocumentReference.create(created.getSchema(), created.getId()));
                })
                .then(foundDocument => expect(foundDocument.getDescriptor()).toBe('7 abc'))
                .catch(fail)
                .then(done);
        });
    });

    describe('integration test', () => {
        let schema;
        beforeEach((done) => {
            schema = Schema.create('people', 'people')
                .setFields([
                    { id: 'first_name', name: 'First Name', type: 'text' },
                    { id: 'last_name', name: 'Last Name', type: 'text' },
                    { id: 'id', name: 'Id', type: 'number' },
                ])
                .setDescriptor(['first_name', 'last_name']);
            schemaStorage.get.and.callThrough();
            schemaStorage.create(schema)
                .then(() => documentStorage.clear(schema))
                .catch(fail)
                .then(done);
        });

        it('should search for documents by the descriptor', (done) => {
            const baseDocument = Document.create(schema.getId(), null, null);
            const docs = [
                baseDocument.copy().setData({ first_name: 'John', last_name: 'Smith' }),
                baseDocument.copy().setData({ first_name: 'John', last_name: 'Doe' }),
                baseDocument.copy().setData({ first_name: 'Joseph', last_name: 'Doe' }),
            ];
            docs.map(doc => () => documentStorage.create(doc))
                .reduce(Q.when, Q.when())
                .then(() => documentStorage.list(schema.getId(), ListOptions.create().setSearch('John')))
                .then((res) => {
                    expect(res.getCount()).toBe(2);
                })
                .catch(fail)
                .then(done);
        });
    });
});
