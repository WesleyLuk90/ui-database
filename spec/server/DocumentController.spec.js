const superagent = require('superagent');
const Q = require('q');
const Schema = require('../../src/server/Schema');
const Document = require('../../src/server/Document');
const ServerToolkit = require('./ServerToolkit');
const ListResults = require('../../src/server/ListResults');
const ModuleHarness = require('./ModuleHarness');
const ListOptions = require('../../src/server/ListOptions');

describe('DocumentController', () => {
    let controller;
    let documentStorage;
    const testSchema = 'test_schema';
    beforeEach((done) => {
        const module = ModuleHarness.create();
        documentStorage = module.get('DocumentStorage');
        const schemaStorage = module.get('SchemaStorage');
        spyOn(schemaStorage, 'get').and.returnValue(Q.when(Schema.create(testSchema, testSchema).setDescriptor([])));
        controller = module.get('DocumentController');
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

    describe('list', () => {
        it('should call documentStorage.list', (done) => {
            spyOn(documentStorage, 'list').and.returnValue(Q.when({}));
            controller.list({ params: { schema: testSchema, search: 'abc', limit: 10 } })
                .then((results) => {
                    expect(documentStorage.list).toHaveBeenCalledWith(testSchema, ListOptions.create().setLimit(10).setSearch('abc'));
                    expect(results).toEqual({});
                })
                .catch(fail)
                .then(done);
        });

        it('should list from the store', (done) => {
            documentStorage.create(Document.create(testSchema, null, { more: 'data' }))
                .then(() => controller.list({ params: { schema: testSchema } }))
                .then((results) => {
                    expect(results instanceof ListResults).toBe(true);
                    expect(results.getTotal()).toBe(1);
                    const documents = results.get();
                    expect(Array.isArray(documents)).toBe(true);
                    expect(documents.length).toBe(1);
                    expect(documents[0].getId()).toBeTruthy();
                    expect(documents[0].getSchema()).toBe(testSchema);
                })
                .catch(fail)
                .then(done);
        });
    });

    describe('api', () => {
        let schemaStorage;
        const server = ServerToolkit.createServer((module) => {
            schemaStorage = module.get('SchemaStorage');
        });
        beforeEach(() => {
            spyOn(schemaStorage, 'get').and.returnValue(Q.when(Schema.create(testSchema, testSchema).setDescriptor([])));
        });
        it('should expose get', (done) => {
            superagent.get(`${server.getBaseUrl()}/api/document/test_schema/id123`)
                .then((res) => {
                    expect(res.body).toEqual({
                        result: null,
                    });
                })
                .catch(fail)
                .then(done);
        });

        it('should expose create', (done) => {
            superagent.put(`${server.getBaseUrl()}/api/document/test_schema`, { data: { more: 'data' } })
                .then((res) => {
                    const document = res.body.result;
                    expect(document.schema).toBe('test_schema');
                    expect(document.id).toBeTruthy();
                    expect(document.createdAt).toBeTruthy();
                    expect(document.updatedAt).toBeTruthy();
                    expect(document.data).toEqual({ more: 'data' });
                })
                .catch(fail)
                .then(done);
        });

        it('should expose list', (done) => {
            superagent.get(`${server.getBaseUrl()}/api/document/test_schema`)
                .then((res) => {
                    expect(res.body.result).toEqual([]);
                    expect(res.body.total).toEqual(0);
                })
                .catch(fail)
                .then(done);
        });

        it('should update', (done) => {
            documentStorage.create(Document.create(testSchema, null, { much: 'data' }))
                .then(newDoc => superagent.post(
                    `${server.getBaseUrl()}/api/document/test_schema/${newDoc.getId()}`, { data: { much: 'more data' } }))
                .then((res) => {
                    const doc = res.body.result;
                    expect(doc.schema).toEqual(testSchema);
                    expect(doc.id).toBeTruthy();
                    expect(doc.createdAt).toBeTruthy();
                    expect(doc.updatedAt).toBeTruthy();
                    expect(doc.data).toBeTruthy({ much: 'more data' });
                })
                .catch(fail)
                .then(done);
        });
    });
});
