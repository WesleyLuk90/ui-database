const DocumentController = require('../../src/server/DocumentController');
const DocumentStorage = require('../../src/server/DocumentStorage');
const Database = require('../../src/server/Database');
const Config = require('../../src/server/Config');
const Schema = require('../../src/server/Schema');
const Document = require('../../src/server/Document');

describe('DocumentController', () => {
    let controller;
    let documentStorage;
    const testSchema = 'test_schema';
    beforeEach((done) => {
        documentStorage = new DocumentStorage(new Database(new Config()));
        controller = new DocumentController(documentStorage);
        documentStorage.clear(Schema.create('Test Schema', testSchema))
            .catch(fail)
            .then(done);
    });

    it('should create', (done) => {
        const request = {
            params: {
                schema: testSchema,
            },
            body: {
                data: {
                    some: 'data',
                },
            },
        };
        controller.create(request)
            .then((document) => {
                expect(document.getId()).toBeTruthy();
                expect(document.getSchema()).toBe(testSchema);
                expect(document.getCreatedAt()).toBeTruthy();
                expect(document.getUpdatedAt()).toBeTruthy();
                expect(document.getData()).toEqual({ some: 'data' });
            })
            .catch(fail)
            .then(done);
    });

    it('should update', (done) => {
        documentStorage.create(Document.create(testSchema, null, { some: 'data' }))
            .then((newDocument) => {
                const request = {
                    params: {
                        schema: testSchema,
                        id: newDocument.getId(),
                    },
                    body: {
                        data: {
                            some: 'new data',
                        },
                    },
                };
                return controller.update(request);
            })
            .then((document) => {
                expect(document.getId()).toBeTruthy();
                expect(document.getCreatedAt()).toBeTruthy();
                expect(document.getUpdatedAt()).toBeTruthy();
                expect(document.getData()).toEqual({ some: 'new data' });
                expect(document.getSchema()).toBe(testSchema);
            })
            .catch(fail)
            .then(done);
    });

    it('should get', (done) => {
        documentStorage.create(Document.create(testSchema, null, { other: 'data' }))
            .then((newDocument) => {
                const request = {
                    params: {
                        id: newDocument.getId(),
                        schema: testSchema,
                    },
                };
                return controller.get(request);
            })
            .then((document) => {
                expect(document.getId()).toBeTruthy();
                expect(document.getSchema()).toBe(testSchema);
                expect(document.getData()).toEqual({ other: 'data' });
            })
            .catch(fail)
            .then(done);
    });
    //
    // it('should list', (done) => {
    //     const request = {};
    //     documentStorage.create(Document.create('my document', 'my_document'))
    //         .then(() => controller.list(request))
    //         .then((documents) => {
    //             expect(Array.isArray(documents)).toBe(true);
    //             expect(documents.length).toBe(1);
    //             expect(documents[0].getId()).toBe('my_document');
    //             expect(documents[0].getName()).toBe('my document');
    //         })
    //         .catch(fail)
    //         .then(done);
    // });
    //
    // describe('api', () => {
    //     const server = ServerToolkit.createServer();
    //     it('should expose get', (done) => {
    //         superagent.get(`${server.getBaseUrl()}/api/document/invalid-document-id`)
    //             .then((res) => {
    //                 expect(res.body).toEqual({
    //                     result: null,
    //                 });
    //             })
    //             .catch(fail)
    //             .then(done);
    //     });
    //
    //     it('should expose create', (done) => {
    //         superagent.put(`${server.getBaseUrl()}/api/document/`, { name: 'My Document', id: 'my_document' })
    //             .then((res) => {
    //                 const document = res.body.result;
    //                 expect(document.name).toBe('My Document');
    //                 expect(document.id).toBe('my_document');
    //                 expect(document.fields).toEqual([]);
    //             })
    //             .catch(fail)
    //             .then(done);
    //     });
    //
    //     it('should expose list', (done) => {
    //         superagent.get(`${server.getBaseUrl()}/api/document/`)
    //             .then((res) => {
    //                 expect(res.body.result).toEqual([]);
    //             })
    //             .catch(fail)
    //             .then(done);
    //     });
    //
    //     it('should update', (done) => {
    //         documentStorage.create(Document.create('My Document', 'my_document'))
    //             .then(() => superagent.post(`${server.getBaseUrl()}/api/document/`, { id: 'my_document', name: 'New Document name', fields: [] }))
    //             .then((res) => {
    //                 expect(res.body.result).toEqual({ id: 'my_document', name: 'New Document name', fields: [] });
    //             })
    //             .catch(fail)
    //             .then(done);
    //     });
    // });
});
